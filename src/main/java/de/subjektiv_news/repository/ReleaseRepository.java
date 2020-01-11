package de.subjektiv_news.repository;

import de.subjektiv_news.domain.Release;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Release entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReleaseRepository extends JpaRepository<Release, Long> {

}
