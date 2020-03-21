package de.savethepub.webapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.savethepub.webapp.web.rest.TestUtil;

public class GastronomyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gastronomy.class);
        Gastronomy gastronomy1 = new Gastronomy();
        gastronomy1.setId(1L);
        Gastronomy gastronomy2 = new Gastronomy();
        gastronomy2.setId(gastronomy1.getId());
        assertThat(gastronomy1).isEqualTo(gastronomy2);
        gastronomy2.setId(2L);
        assertThat(gastronomy1).isNotEqualTo(gastronomy2);
        gastronomy1.setId(null);
        assertThat(gastronomy1).isNotEqualTo(gastronomy2);
    }
}
