package de.subjektiv_news.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Keyword.
 */
@Entity
@Table(name = "keyword")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Keyword implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "words", nullable = false)
    private String words;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "keyword_document",
               joinColumns = @JoinColumn(name = "keyword_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "document_id", referencedColumnName = "id"))
    private Set<Release> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWords() {
        return words;
    }

    public Keyword words(String words) {
        this.words = words;
        return this;
    }

    public void setWords(String words) {
        this.words = words;
    }

    public Set<Release> getDocuments() {
        return documents;
    }

    public Keyword documents(Set<Release> releases) {
        this.documents = releases;
        return this;
    }

    public Keyword addDocument(Release release) {
        this.documents.add(release);
        release.getKeywords().add(this);
        return this;
    }

    public Keyword removeDocument(Release release) {
        this.documents.remove(release);
        release.getKeywords().remove(this);
        return this;
    }

    public void setDocuments(Set<Release> releases) {
        this.documents = releases;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Keyword)) {
            return false;
        }
        return id != null && id.equals(((Keyword) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Keyword{" +
            "id=" + getId() +
            ", words='" + getWords() + "'" +
            "}";
    }
}
