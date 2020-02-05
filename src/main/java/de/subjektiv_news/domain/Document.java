package de.subjektiv_news.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * https:
     */
    @ApiModelProperty(value = "https:")
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "version", nullable = false)
    private Long version;

    @NotNull
    @Column(name = "publish_date", nullable = false)
    private LocalDate publishDate;

    @Column(name = "upload_timestamp")
    private Instant uploadTimestamp;

    @NotNull
    @Column(name = "number_of_pages", nullable = false)
    private Long numberOfPages;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "download_link")
    private String downloadLink;

    @Column(name = "mime_type")
    private String mimeType;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    @JsonIgnore
    private Content content;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("documents")
    private Release release;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Document title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getVersion() {
        return version;
    }

    public Document version(Long version) {
        this.version = version;
        return this;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public Document publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Instant getUploadTimestamp() {
        return uploadTimestamp;
    }

    public Document uploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
        return this;
    }

    public void setUploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }

    public Long getNumberOfPages() {
        return numberOfPages;
    }

    public Document numberOfPages(Long numberOfPages) {
        this.numberOfPages = numberOfPages;
        return this;
    }

    public void setNumberOfPages(Long numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public Document fileSize(Long fileSize) {
        this.fileSize = fileSize;
        return this;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public Document downloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
        return this;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public String getMimeType() {
        return mimeType;
    }

    public Document mimeType(String mimeType) {
        this.mimeType = mimeType;
        return this;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Document content(Content content) {
        this.content = content;
        return this;
    }

    public void addContent(byte[] data) {
        Content content = new Content();
        content.setData(data);
        content.setDataContentType("not-used"); // the field is generated by JHipster but redundant
        this.content = content;
    }

    public byte[] retrieveContent(){
        return content.getData();
    }

    public Release getRelease() {
        return release;
    }

    public Document release(Release release) {
        this.release = release;
        return this;
    }

    public void setRelease(Release release) {
        this.release = release;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", version=" + getVersion() +
            ", publishDate='" + getPublishDate() + "'" +
            ", uploadTimestamp='" + getUploadTimestamp() + "'" +
            ", numberOfPages=" + getNumberOfPages() +
            ", fileSize=" + getFileSize() +
            ", downloadLink='" + getDownloadLink() + "'" +
            ", mimeType='" + getMimeType() + "'" +
            "}";
    }
}
