package de.subjektiv_news.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link de.subjektiv_news.domain.Keyword} entity.
 */
public class KeywordDTO implements Serializable {

    private Long id;

    @NotNull
    private String word;


    private Set<ReleaseDTO> documents = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public Set<ReleaseDTO> getDocuments() {
        return documents;
    }

    public void setDocuments(Set<ReleaseDTO> releases) {
        this.documents = releases;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KeywordDTO keywordDTO = (KeywordDTO) o;
        if (keywordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keywordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KeywordDTO{" +
            "id=" + getId() +
            ", word='" + getWord() + "'" +
            "}";
    }
}
