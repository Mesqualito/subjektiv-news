package de.subjektiv_news.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.subjektiv_news.web.rest.TestUtil;

public class ReleaseDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReleaseDTO.class);
        ReleaseDTO releaseDTO1 = new ReleaseDTO();
        releaseDTO1.setId(1L);
        ReleaseDTO releaseDTO2 = new ReleaseDTO();
        assertThat(releaseDTO1).isNotEqualTo(releaseDTO2);
        releaseDTO2.setId(releaseDTO1.getId());
        assertThat(releaseDTO1).isEqualTo(releaseDTO2);
        releaseDTO2.setId(2L);
        assertThat(releaseDTO1).isNotEqualTo(releaseDTO2);
        releaseDTO1.setId(null);
        assertThat(releaseDTO1).isNotEqualTo(releaseDTO2);
    }
}
