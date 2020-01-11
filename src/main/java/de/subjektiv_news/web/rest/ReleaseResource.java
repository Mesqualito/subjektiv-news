package de.subjektiv_news.web.rest;

import de.subjektiv_news.domain.Release;
import de.subjektiv_news.repository.ReleaseRepository;
import de.subjektiv_news.web.rest.errors.BadRequestAlertException;

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
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.subjektiv_news.domain.Release}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReleaseResource {

    private final Logger log = LoggerFactory.getLogger(ReleaseResource.class);

    private static final String ENTITY_NAME = "release";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReleaseRepository releaseRepository;

    public ReleaseResource(ReleaseRepository releaseRepository) {
        this.releaseRepository = releaseRepository;
    }

    /**
     * {@code POST  /releases} : Create a new release.
     *
     * @param release the release to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new release, or with status {@code 400 (Bad Request)} if the release has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/releases")
    public ResponseEntity<Release> createRelease(@Valid @RequestBody Release release) throws URISyntaxException {
        log.debug("REST request to save Release : {}", release);
        if (release.getId() != null) {
            throw new BadRequestAlertException("A new release cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Release result = releaseRepository.save(release);
        return ResponseEntity.created(new URI("/api/releases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /releases} : Updates an existing release.
     *
     * @param release the release to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated release,
     * or with status {@code 400 (Bad Request)} if the release is not valid,
     * or with status {@code 500 (Internal Server Error)} if the release couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/releases")
    public ResponseEntity<Release> updateRelease(@Valid @RequestBody Release release) throws URISyntaxException {
        log.debug("REST request to update Release : {}", release);
        if (release.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Release result = releaseRepository.save(release);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, release.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /releases} : get all the releases.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of releases in body.
     */
    @GetMapping("/releases")
    public ResponseEntity<List<Release>> getAllReleases(Pageable pageable) {
        log.debug("REST request to get a page of Releases");
        Page<Release> page = releaseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /releases/:id} : get the "id" release.
     *
     * @param id the id of the release to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the release, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/releases/{id}")
    public ResponseEntity<Release> getRelease(@PathVariable Long id) {
        log.debug("REST request to get Release : {}", id);
        Optional<Release> release = releaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(release);
    }

    /**
     * {@code DELETE  /releases/:id} : delete the "id" release.
     *
     * @param id the id of the release to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/releases/{id}")
    public ResponseEntity<Void> deleteRelease(@PathVariable Long id) {
        log.debug("REST request to delete Release : {}", id);
        releaseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
