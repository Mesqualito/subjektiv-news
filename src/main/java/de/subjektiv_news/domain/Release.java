package de.subjektiv_news.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Release.
 */
@Entity
@Table(name = "release")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Release implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "version_count", nullable = false)
    private Long versionCount;

    /**
     * https:
     */
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

    @OneToOne
    @JoinColumn(unique = true)
    private Document document;

    @OneToMany(mappedBy = "release")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Article> articles = new HashSet<>();

    @ManyToMany(mappedBy = "documents")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Keyword> keywords = new HashSet<>();

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

    public Release title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getVersionCount() {
        return versionCount;
    }

    public Release versionCount(Long versionCount) {
        this.versionCount = versionCount;
        return this;
    }

    public void setVersionCount(Long versionCount) {
        this.versionCount = versionCount;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public Release publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Instant getUploadTimestamp() {
        return uploadTimestamp;
    }

    public Release uploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
        return this;
    }

    public void setUploadTimestamp(Instant uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }

    public Long getNumberOfPages() {
        return numberOfPages;
    }

    public Release numberOfPages(Long numberOfPages) {
        this.numberOfPages = numberOfPages;
        return this;
    }

    public void setNumberOfPages(Long numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public Release fileSize(Long fileSize) {
        this.fileSize = fileSize;
        return this;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public Release downloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
        return this;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public Document getDocument() {
        return document;
    }

    public Release document(Document document) {
        this.document = document;
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public Release articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public Release addArticle(Article article) {
        this.articles.add(article);
        article.setRelease(this);
        return this;
    }

    public Release removeArticle(Article article) {
        this.articles.remove(article);
        article.setRelease(null);
        return this;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }

    public Set<Keyword> getKeywords() {
        return keywords;
    }

    public Release keywords(Set<Keyword> keywords) {
        this.keywords = keywords;
        return this;
    }

    public Release addKeyword(Keyword keyword) {
        this.keywords.add(keyword);
        keyword.getDocuments().add(this);
        return this;
    }

    public Release removeKeyword(Keyword keyword) {
        this.keywords.remove(keyword);
        keyword.getDocuments().remove(this);
        return this;
    }

    public void setKeywords(Set<Keyword> keywords) {
        this.keywords = keywords;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Release)) {
            return false;
        }
        return id != null && id.equals(((Release) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Release{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", versionCount=" + getVersionCount() +
            ", publishDate='" + getPublishDate() + "'" +
            ", uploadTimestamp='" + getUploadTimestamp() + "'" +
            ", numberOfPages=" + getNumberOfPages() +
            ", fileSize=" + getFileSize() +
            ", downloadLink='" + getDownloadLink() + "'" +
            "}";
    }
}
