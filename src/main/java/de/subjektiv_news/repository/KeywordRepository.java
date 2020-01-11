package de.subjektiv_news.repository;

import de.subjektiv_news.domain.Keyword;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Keyword entity.
 */
@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    @Query(value = "select distinct keyword from Keyword keyword left join fetch keyword.documents",
        countQuery = "select count(distinct keyword) from Keyword keyword")
    Page<Keyword> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct keyword from Keyword keyword left join fetch keyword.documents")
    List<Keyword> findAllWithEagerRelationships();

    @Query("select keyword from Keyword keyword left join fetch keyword.documents where keyword.id =:id")
    Optional<Keyword> findOneWithEagerRelationships(@Param("id") Long id);

}
