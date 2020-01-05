package de.subjektiv_news.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link de.subjektiv_news.domain.Article} entity.
 */
public class ArticleDTO implements Serializable {

    private Long id;

    @NotNull
    private String headline;

    @NotNull
    private Long pageNumber;

    @Lob
    private String content;


    private Long releaseId;

    private String releaseVersionCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public Long getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Long pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getReleaseId() {
        return releaseId;
    }

    public void setReleaseId(Long releaseId) {
        this.releaseId = releaseId;
    }

    public String getReleaseVersionCount() {
        return releaseVersionCount;
    }

    public void setReleaseVersionCount(String releaseVersionCount) {
        this.releaseVersionCount = releaseVersionCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (articleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", headline='" + getHeadline() + "'" +
            ", pageNumber=" + getPageNumber() +
            ", content='" + getContent() + "'" +
            ", releaseId=" + getReleaseId() +
            ", releaseVersionCount='" + getReleaseVersionCount() + "'" +
            "}";
    }
}
