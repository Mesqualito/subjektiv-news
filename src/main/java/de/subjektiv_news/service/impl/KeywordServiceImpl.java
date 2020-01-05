package de.subjektiv_news.service.impl;

import de.subjektiv_news.service.KeywordService;
import de.subjektiv_news.domain.Keyword;
import de.subjektiv_news.repository.KeywordRepository;
import de.subjektiv_news.service.dto.KeywordDTO;
import de.subjektiv_news.service.mapper.KeywordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Keyword}.
 */
@Service
@Transactional
public class KeywordServiceImpl implements KeywordService {

    private final Logger log = LoggerFactory.getLogger(KeywordServiceImpl.class);

    private final KeywordRepository keywordRepository;

    private final KeywordMapper keywordMapper;

    public KeywordServiceImpl(KeywordRepository keywordRepository, KeywordMapper keywordMapper) {
        this.keywordRepository = keywordRepository;
        this.keywordMapper = keywordMapper;
    }

    /**
     * Save a keyword.
     *
     * @param keywordDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public KeywordDTO save(KeywordDTO keywordDTO) {
        log.debug("Request to save Keyword : {}", keywordDTO);
        Keyword keyword = keywordMapper.toEntity(keywordDTO);
        keyword = keywordRepository.save(keyword);
        return keywordMapper.toDto(keyword);
    }

    /**
     * Get all the keywords.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<KeywordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Keywords");
        return keywordRepository.findAll(pageable)
            .map(keywordMapper::toDto);
    }

    /**
     * Get all the keywords with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<KeywordDTO> findAllWithEagerRelationships(Pageable pageable) {
        return keywordRepository.findAllWithEagerRelationships(pageable).map(keywordMapper::toDto);
    }
    

    /**
     * Get one keyword by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<KeywordDTO> findOne(Long id) {
        log.debug("Request to get Keyword : {}", id);
        return keywordRepository.findOneWithEagerRelationships(id)
            .map(keywordMapper::toDto);
    }

    /**
     * Delete the keyword by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Keyword : {}", id);
        keywordRepository.deleteById(id);
    }
}
