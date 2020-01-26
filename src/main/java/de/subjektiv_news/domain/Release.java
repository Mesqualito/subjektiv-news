package de.subjektiv_news.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
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
    @Column(name = "chrono_order_no", nullable = false)
    private Long chronoOrderNo;

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Article> articles = new HashSet<>();

    @OneToMany(mappedBy = "release", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> documents = new HashSet<>();

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

    public Long getChronoOrderNo() {
        return chronoOrderNo;
    }

    public Release chronoOrderNo(Long chronoOrderNo) {
        this.chronoOrderNo = chronoOrderNo;
        return this;
    }

    public void setChronoOrderNo(Long chronoOrderNo) {
        this.chronoOrderNo = chronoOrderNo;
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

    public Set<Document> getDocuments() {
        return documents;
    }

    public Release documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Release addDocument(Document document) {
        this.documents.add(document);
        document.setRelease(this);
        return this;
    }

    public Release removeDocument(Document document) {
        this.documents.remove(document);
        document.setRelease(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
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
            ", chronoOrderNo=" + getChronoOrderNo() +
            "}";
    }
}
