package de.subjektiv_news.service.mapper;

import de.subjektiv_news.domain.*;
import de.subjektiv_news.service.dto.ReleaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Release} and its DTO {@link ReleaseDTO}.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface ReleaseMapper extends EntityMapper<ReleaseDTO, Release> {

    @Mapping(source = "document.id", target = "documentId")
    ReleaseDTO toDto(Release release);

    @Mapping(source = "documentId", target = "document")
    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "removeArticle", ignore = true)
    @Mapping(target = "keywords", ignore = true)
    @Mapping(target = "removeKeyword", ignore = true)
    Release toEntity(ReleaseDTO releaseDTO);

    default Release fromId(Long id) {
        if (id == null) {
            return null;
        }
        Release release = new Release();
        release.setId(id);
        return release;
    }
}
