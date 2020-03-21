package de.savethepub.webapp.repository;

import de.savethepub.webapp.domain.Gastronomy;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Gastronomy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GastronomyRepository extends JpaRepository<Gastronomy, Long> {
}
