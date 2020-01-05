package de.subjektiv_news.service;

import de.subjektiv_news.service.dto.ReleaseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link de.subjektiv_news.domain.Release}.
 */
public interface ReleaseService {

    /**
     * Save a release.
     *
     * @param releaseDTO the entity to save.
     * @return the persisted entity.
     */
    ReleaseDTO save(ReleaseDTO releaseDTO);

    /**
     * Get all the releases.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReleaseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" release.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReleaseDTO> findOne(Long id);

    /**
     * Delete the "id" release.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
