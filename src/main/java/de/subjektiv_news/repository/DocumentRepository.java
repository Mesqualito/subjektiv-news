package de.subjektiv_news.repository;

import de.subjektiv_news.domain.Document;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    @EntityGraph(attributePaths = "content")
    Optional<Document> findOneById(Long id);

}
