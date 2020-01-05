package de.subjektiv_news.service.dto;
import io.swagger.annotations.ApiModelProperty;
import java.time.Instant;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link de.subjektiv_news.domain.Release} entity.
 */
public class ReleaseDTO implements Serializable {

    private Long id;

    private String title;

    @NotNull
    private Long versionCount;

    /**
     * https:
     */
    @NotNull
    @ApiModelProperty(value = "https:", required = true)
    private LocalDate publishDate;

    private Instant uploadTimestamp;

    @NotNull
    private Long numberOfPages;

    private Long fileSize;

    private String downloadLink;


    private Long documentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getVersionCount() {
        return versionCount;
    }

    public void setVersionCount(Long versionCount) {
        this.versionCount = versionCount;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Instant getUploadTimestamp() {
        return uploadTimestamp;
    }

    public void setUploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }

    public Long getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(Long numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReleaseDTO releaseDTO = (ReleaseDTO) o;
        if (releaseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), releaseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReleaseDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", versionCount=" + getVersionCount() +
            ", publishDate='" + getPublishDate() + "'" +
            ", uploadTimestamp='" + getUploadTimestamp() + "'" +
            ", numberOfPages=" + getNumberOfPages() +
            ", fileSize=" + getFileSize() +
            ", downloadLink='" + getDownloadLink() + "'" +
            ", documentId=" + getDocumentId() +
            "}";
    }
}
