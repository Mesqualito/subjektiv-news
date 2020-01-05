package de.subjektiv_news.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class KeywordMapperTest {

    private KeywordMapper keywordMapper;

    @BeforeEach
    public void setUp() {
        keywordMapper = new KeywordMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(keywordMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(keywordMapper.fromId(null)).isNull();
    }
}
