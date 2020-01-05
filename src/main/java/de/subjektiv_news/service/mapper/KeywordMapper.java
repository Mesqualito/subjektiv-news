package de.subjektiv_news.service.mapper;

import de.subjektiv_news.domain.*;
import de.subjektiv_news.service.dto.KeywordDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Keyword} and its DTO {@link KeywordDTO}.
 */
@Mapper(componentModel = "spring", uses = {ReleaseMapper.class})
public interface KeywordMapper extends EntityMapper<KeywordDTO, Keyword> {


    @Mapping(target = "removeDocument", ignore = true)

    default Keyword fromId(Long id) {
        if (id == null) {
            return null;
        }
        Keyword keyword = new Keyword();
        keyword.setId(id);
        return keyword;
    }
}
