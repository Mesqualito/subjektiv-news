package de.subjektiv_news.service.impl;

import de.subjektiv_news.service.ReleaseService;
import de.subjektiv_news.domain.Release;
import de.subjektiv_news.repository.ReleaseRepository;
import de.subjektiv_news.service.dto.ReleaseDTO;
import de.subjektiv_news.service.mapper.ReleaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Release}.
 */
@Service
@Transactional
public class ReleaseServiceImpl implements ReleaseService {

    private final Logger log = LoggerFactory.getLogger(ReleaseServiceImpl.class);

    private final ReleaseRepository releaseRepository;

    private final ReleaseMapper releaseMapper;

    public ReleaseServiceImpl(ReleaseRepository releaseRepository, ReleaseMapper releaseMapper) {
        this.releaseRepository = releaseRepository;
        this.releaseMapper = releaseMapper;
    }

    /**
     * Save a release.
     *
     * @param releaseDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReleaseDTO save(ReleaseDTO releaseDTO) {
        log.debug("Request to save Release : {}", releaseDTO);
        Release release = releaseMapper.toEntity(releaseDTO);
        release = releaseRepository.save(release);
        return releaseMapper.toDto(release);
    }

    /**
     * Get all the releases.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReleaseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Releases");
        return releaseRepository.findAll(pageable)
            .map(releaseMapper::toDto);
    }


    /**
     * Get one release by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReleaseDTO> findOne(Long id) {
        log.debug("Request to get Release : {}", id);
        return releaseRepository.findById(id)
            .map(releaseMapper::toDto);
    }

    /**
     * Delete the release by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Release : {}", id);
        releaseRepository.deleteById(id);
    }
}
