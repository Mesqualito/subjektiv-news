package de.subjektiv_news.web.rest;

import de.subjektiv_news.SubjektivNewsApp;
import de.subjektiv_news.domain.Release;
import de.subjektiv_news.domain.Keyword;
import de.subjektiv_news.repository.ReleaseRepository;
import de.subjektiv_news.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static de.subjektiv_news.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReleaseResource} REST controller.
 */
@SpringBootTest(classes = SubjektivNewsApp.class)
public class ReleaseResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Long DEFAULT_VERSION_COUNT = 1L;
    private static final Long UPDATED_VERSION_COUNT = 2L;

    @Autowired
    private ReleaseRepository releaseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReleaseMockMvc;

    private Release release;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReleaseResource releaseResource = new ReleaseResource(releaseRepository);
        this.restReleaseMockMvc = MockMvcBuilders.standaloneSetup(releaseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Release createEntity(EntityManager em) {
        Release release = new Release()
            .title(DEFAULT_TITLE)
            .versionCount(DEFAULT_VERSION_COUNT);
        // Add required entity
        Keyword keyword;
        if (TestUtil.findAll(em, Keyword.class).isEmpty()) {
            keyword = KeywordResourceIT.createEntity(em);
            em.persist(keyword);
            em.flush();
        } else {
            keyword = TestUtil.findAll(em, Keyword.class).get(0);
        }
        release.getKeywords().add(keyword);
        return release;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Release createUpdatedEntity(EntityManager em) {
        Release release = new Release()
            .title(UPDATED_TITLE)
            .versionCount(UPDATED_VERSION_COUNT);
        // Add required entity
        Keyword keyword;
        if (TestUtil.findAll(em, Keyword.class).isEmpty()) {
            keyword = KeywordResourceIT.createUpdatedEntity(em);
            em.persist(keyword);
            em.flush();
        } else {
            keyword = TestUtil.findAll(em, Keyword.class).get(0);
        }
        release.getKeywords().add(keyword);
        return release;
    }

    @BeforeEach
    public void initTest() {
        release = createEntity(em);
    }

    @Test
    @Transactional
    public void createRelease() throws Exception {
        int databaseSizeBeforeCreate = releaseRepository.findAll().size();

        // Create the Release
        restReleaseMockMvc.perform(post("/api/releases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(release)))
            .andExpect(status().isCreated());

        // Validate the Release in the database
        List<Release> releaseList = releaseRepository.findAll();
        assertThat(releaseList).hasSize(databaseSizeBeforeCreate + 1);
        Release testRelease = releaseList.get(releaseList.size() - 1);
        assertThat(testRelease.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testRelease.getVersionCount()).isEqualTo(DEFAULT_VERSION_COUNT);
    }

    @Test
    @Transactional
    public void createReleaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = releaseRepository.findAll().size();

        // Create the Release with an existing ID
        release.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReleaseMockMvc.perform(post("/api/releases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(release)))
            .andExpect(status().isBadRequest());

        // Validate the Release in the database
        List<Release> releaseList = releaseRepository.findAll();
        assertThat(releaseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVersionCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = releaseRepository.findAll().size();
        // set the field null
        release.setVersionCount(null);

        // Create the Release, which fails.

        restReleaseMockMvc.perform(post("/api/releases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(release)))
            .andExpect(status().isBadRequest());

        List<Release> releaseList = releaseRepository.findAll();
        assertThat(releaseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReleases() throws Exception {
        // Initialize the database
        releaseRepository.saveAndFlush(release);

        // Get all the releaseList
        restReleaseMockMvc.perform(get("/api/releases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(release.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].versionCount").value(hasItem(DEFAULT_VERSION_COUNT.intValue())));
    }
    
    @Test
    @Transactional
    public void getRelease() throws Exception {
        // Initialize the database
        releaseRepository.saveAndFlush(release);

        // Get the release
        restReleaseMockMvc.perform(get("/api/releases/{id}", release.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(release.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.versionCount").value(DEFAULT_VERSION_COUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRelease() throws Exception {
        // Get the release
        restReleaseMockMvc.perform(get("/api/releases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRelease() throws Exception {
        // Initialize the database
        releaseRepository.saveAndFlush(release);

        int databaseSizeBeforeUpdate = releaseRepository.findAll().size();

        // Update the release
        Release updatedRelease = releaseRepository.findById(release.getId()).get();
        // Disconnect from session so that the updates on updatedRelease are not directly saved in db
        em.detach(updatedRelease);
        updatedRelease
            .title(UPDATED_TITLE)
            .versionCount(UPDATED_VERSION_COUNT);

        restReleaseMockMvc.perform(put("/api/releases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRelease)))
            .andExpect(status().isOk());

        // Validate the Release in the database
        List<Release> releaseList = releaseRepository.findAll();
        assertThat(releaseList).hasSize(databaseSizeBeforeUpdate);
        Release testRelease = releaseList.get(releaseList.size() - 1);
        assertThat(testRelease.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testRelease.getVersionCount()).isEqualTo(UPDATED_VERSION_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingRelease() throws Exception {
        int databaseSizeBeforeUpdate = releaseRepository.findAll().size();

        // Create the Release

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReleaseMockMvc.perform(put("/api/releases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(release)))
            .andExpect(status().isBadRequest());

        // Validate the Release in the database
        List<Release> releaseList = releaseRepository.findAll();
        assertThat(releaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRelease() throws Exception {
        // Initialize the database
        releaseRepository.saveAndFlush(release);

        int databaseSizeBeforeDelete = releaseRepository.findAll().size();

        // Delete the release
        restReleaseMockMvc.perform(delete("/api/releases/{id}", release.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Release> releaseList = releaseRepository.findAll();
        assertThat(releaseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
