package de.subjektiv_news.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ReleaseMapperTest {

    private ReleaseMapper releaseMapper;

    @BeforeEach
    public void setUp() {
        releaseMapper = new ReleaseMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(releaseMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(releaseMapper.fromId(null)).isNull();
    }
}
