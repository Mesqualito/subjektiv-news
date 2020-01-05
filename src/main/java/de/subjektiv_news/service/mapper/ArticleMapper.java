package de.subjektiv_news.service.mapper;

import de.subjektiv_news.domain.*;
import de.subjektiv_news.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Article} and its DTO {@link ArticleDTO}.
 */
@Mapper(componentModel = "spring", uses = {ReleaseMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    @Mapping(source = "release.id", target = "releaseId")
    @Mapping(source = "release.versionCount", target = "releaseVersionCount")
    ArticleDTO toDto(Article article);

    @Mapping(source = "releaseId", target = "release")
    Article toEntity(ArticleDTO articleDTO);

    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
