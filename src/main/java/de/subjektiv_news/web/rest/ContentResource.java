package de.subjektiv_news.web.rest;

import de.subjektiv_news.domain.Content;
import de.subjektiv_news.repository.ContentRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link de.subjektiv_news.domain.Content}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContentResource {

    private final Logger log = LoggerFactory.getLogger(ContentResource.class);

    private static final String ENTITY_NAME = "content";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContentRepository contentRepository;

    public ContentResource(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    /**
     * {@code POST  /contents} : Create a new content.
     *
     * @param content the content to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new content, or with status {@code 400 (Bad Request)} if the content has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contents")
    public ResponseEntity<Content> createContent(@Valid @RequestBody Content content) throws URISyntaxException {
        log.debug("REST request to save Content : {}", content);
        if (content.getId() != null) {
            throw new BadRequestAlertException("A new content cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Content result = contentRepository.save(content);
        return ResponseEntity.created(new URI("/api/contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contents} : Updates an existing content.
     *
     * @param content the content to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated content,
     * or with status {@code 400 (Bad Request)} if the content is not valid,
     * or with status {@code 500 (Internal Server Error)} if the content couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contents")
    public ResponseEntity<Content> updateContent(@Valid @RequestBody Content content) throws URISyntaxException {
        log.debug("REST request to update Content : {}", content);
        if (content.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Content result = contentRepository.save(content);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, content.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contents} : get all the contents.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contents in body.
     */
    @GetMapping("/contents")
    public ResponseEntity<List<Content>> getAllContents(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("document-is-null".equals(filter)) {
            log.debug("REST request to get all Contents where document is null");
            return new ResponseEntity<>(StreamSupport
                .stream(contentRepository.findAll().spliterator(), false)
                .filter(content -> content.getDocument() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Contents");
        Page<Content> page = contentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contents/:id} : get the "id" content.
     *
     * @param id the id of the content to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the content, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contents/{id}")
    public ResponseEntity<Content> getContent(@PathVariable Long id) {
        log.debug("REST request to get Content : {}", id);
        Optional<Content> content = contentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(content);
    }

    /**
     * {@code DELETE  /contents/:id} : delete the "id" content.
     *
     * @param id the id of the content to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contents/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        log.debug("REST request to delete Content : {}", id);
        contentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
