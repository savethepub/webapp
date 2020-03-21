package de.savethepub.webapp.web.rest;

import de.savethepub.webapp.domain.Gastronomy;
import de.savethepub.webapp.repository.GastronomyRepository;
import de.savethepub.webapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.savethepub.webapp.domain.Gastronomy}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GastronomyResource {

    private final Logger log = LoggerFactory.getLogger(GastronomyResource.class);

    private static final String ENTITY_NAME = "gastronomy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GastronomyRepository gastronomyRepository;

    public GastronomyResource(GastronomyRepository gastronomyRepository) {
        this.gastronomyRepository = gastronomyRepository;
    }

    /**
     * {@code POST  /gastronomies} : Create a new gastronomy.
     *
     * @param gastronomy the gastronomy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gastronomy, or with status {@code 400 (Bad Request)} if the gastronomy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gastronomies")
    public ResponseEntity<Gastronomy> createGastronomy(@Valid @RequestBody Gastronomy gastronomy) throws URISyntaxException {
        log.debug("REST request to save Gastronomy : {}", gastronomy);
        if (gastronomy.getId() != null) {
            throw new BadRequestAlertException("A new gastronomy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gastronomy result = gastronomyRepository.save(gastronomy);
        return ResponseEntity.created(new URI("/api/gastronomies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gastronomies} : Updates an existing gastronomy.
     *
     * @param gastronomy the gastronomy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gastronomy,
     * or with status {@code 400 (Bad Request)} if the gastronomy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gastronomy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gastronomies")
    public ResponseEntity<Gastronomy> updateGastronomy(@Valid @RequestBody Gastronomy gastronomy) throws URISyntaxException {
        log.debug("REST request to update Gastronomy : {}", gastronomy);
        if (gastronomy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Gastronomy result = gastronomyRepository.save(gastronomy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gastronomy.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gastronomies} : get all the gastronomies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gastronomies in body.
     */
    @GetMapping("/gastronomies")
    public List<Gastronomy> getAllGastronomies() {
        log.debug("REST request to get all Gastronomies");
        return gastronomyRepository.findAll();
    }

    /**
     * {@code GET  /gastronomies/:id} : get the "id" gastronomy.
     *
     * @param id the id of the gastronomy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gastronomy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gastronomies/{id}")
    public ResponseEntity<Gastronomy> getGastronomy(@PathVariable Long id) {
        log.debug("REST request to get Gastronomy : {}", id);
        Optional<Gastronomy> gastronomy = gastronomyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gastronomy);
    }

    /**
     * {@code DELETE  /gastronomies/:id} : delete the "id" gastronomy.
     *
     * @param id the id of the gastronomy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gastronomies/{id}")
    public ResponseEntity<Void> deleteGastronomy(@PathVariable Long id) {
        log.debug("REST request to delete Gastronomy : {}", id);
        gastronomyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
