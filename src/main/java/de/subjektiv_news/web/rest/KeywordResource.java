package de.subjektiv_news.web.rest;

import de.subjektiv_news.service.KeywordService;
import de.subjektiv_news.web.rest.errors.BadRequestAlertException;
import de.subjektiv_news.service.dto.KeywordDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.subjektiv_news.domain.Keyword}.
 */
@RestController
@RequestMapping("/api")
public class KeywordResource {

    private final Logger log = LoggerFactory.getLogger(KeywordResource.class);

    private static final String ENTITY_NAME = "keyword";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KeywordService keywordService;

    public KeywordResource(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    /**
     * {@code POST  /keywords} : Create a new keyword.
     *
     * @param keywordDTO the keywordDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new keywordDTO, or with status {@code 400 (Bad Request)} if the keyword has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/keywords")
    public ResponseEntity<KeywordDTO> createKeyword(@Valid @RequestBody KeywordDTO keywordDTO) throws URISyntaxException {
        log.debug("REST request to save Keyword : {}", keywordDTO);
        if (keywordDTO.getId() != null) {
            throw new BadRequestAlertException("A new keyword cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeywordDTO result = keywordService.save(keywordDTO);
        return ResponseEntity.created(new URI("/api/keywords/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /keywords} : Updates an existing keyword.
     *
     * @param keywordDTO the keywordDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated keywordDTO,
     * or with status {@code 400 (Bad Request)} if the keywordDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the keywordDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/keywords")
    public ResponseEntity<KeywordDTO> updateKeyword(@Valid @RequestBody KeywordDTO keywordDTO) throws URISyntaxException {
        log.debug("REST request to update Keyword : {}", keywordDTO);
        if (keywordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KeywordDTO result = keywordService.save(keywordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, keywordDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /keywords} : get all the keywords.
     *

     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of keywords in body.
     */
    @GetMapping("/keywords")
    public ResponseEntity<List<KeywordDTO>> getAllKeywords(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Keywords");
        Page<KeywordDTO> page;
        if (eagerload) {
            page = keywordService.findAllWithEagerRelationships(pageable);
        } else {
            page = keywordService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /keywords/:id} : get the "id" keyword.
     *
     * @param id the id of the keywordDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the keywordDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/keywords/{id}")
    public ResponseEntity<KeywordDTO> getKeyword(@PathVariable Long id) {
        log.debug("REST request to get Keyword : {}", id);
        Optional<KeywordDTO> keywordDTO = keywordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(keywordDTO);
    }

    /**
     * {@code DELETE  /keywords/:id} : delete the "id" keyword.
     *
     * @param id the id of the keywordDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/keywords/{id}")
    public ResponseEntity<Void> deleteKeyword(@PathVariable Long id) {
        log.debug("REST request to delete Keyword : {}", id);
        keywordService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
