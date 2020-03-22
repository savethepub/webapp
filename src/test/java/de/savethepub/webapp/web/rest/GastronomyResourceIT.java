package de.savethepub.webapp.web.rest;

import de.savethepub.webapp.SavethepubApp;
import de.savethepub.webapp.domain.Gastronomy;
import de.savethepub.webapp.repository.GastronomyRepository;

import de.savethepub.webapp.security.AuthoritiesConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.savethepub.webapp.domain.enumeration.GastronomyCategory;
/**
 * Integration tests for the {@link GastronomyResource} REST controller.
 */
@SpringBootTest(classes = SavethepubApp.class)

@AutoConfigureMockMvc
@WithMockUser(authorities = AuthoritiesConstants.ADMIN)
public class GastronomyResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final GastronomyCategory DEFAULT_CATEGORY = GastronomyCategory.BAR;
    private static final GastronomyCategory UPDATED_CATEGORY = GastronomyCategory.CAFE;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE = "BBBBBBBBBB";

    private static final String DEFAULT_ZIP_CODE = "AAAAA";
    private static final String UPDATED_ZIP_CODE = "BBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK_LINK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_TWITTER_LINK = "AAAAAAAAAA";
    private static final String UPDATED_TWITTER_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_INSTAGRAM_LINK = "AAAAAAAAAA";
    private static final String UPDATED_INSTAGRAM_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_GOFUNDME_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GOFUNDME_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPORT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_SUPPORT_LINK = "BBBBBBBBBB";

    @Autowired
    private GastronomyRepository gastronomyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGastronomyMockMvc;

    private Gastronomy gastronomy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gastronomy createEntity(EntityManager em) {
        Gastronomy gastronomy = new Gastronomy()
            .name(DEFAULT_NAME)
            .category(DEFAULT_CATEGORY)
            .description(DEFAULT_DESCRIPTION)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .contactName(DEFAULT_CONTACT_NAME)
            .addressLine(DEFAULT_ADDRESS_LINE)
            .zipCode(DEFAULT_ZIP_CODE)
            .city(DEFAULT_CITY)
            .facebookLink(DEFAULT_FACEBOOK_LINK)
            .twitterLink(DEFAULT_TWITTER_LINK)
            .instagramLink(DEFAULT_INSTAGRAM_LINK)
            .gofundmeName(DEFAULT_GOFUNDME_NAME)
            .supportLink(DEFAULT_SUPPORT_LINK);
        return gastronomy;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gastronomy createUpdatedEntity(EntityManager em) {
        Gastronomy gastronomy = new Gastronomy()
            .name(UPDATED_NAME)
            .category(UPDATED_CATEGORY)
            .description(UPDATED_DESCRIPTION)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .contactName(UPDATED_CONTACT_NAME)
            .addressLine(UPDATED_ADDRESS_LINE)
            .zipCode(UPDATED_ZIP_CODE)
            .city(UPDATED_CITY)
            .facebookLink(UPDATED_FACEBOOK_LINK)
            .twitterLink(UPDATED_TWITTER_LINK)
            .instagramLink(UPDATED_INSTAGRAM_LINK)
            .gofundmeName(UPDATED_GOFUNDME_NAME)
            .supportLink(UPDATED_SUPPORT_LINK);
        return gastronomy;
    }

    @BeforeEach
    public void initTest() {
        gastronomy = createEntity(em);
    }

    @Test
    @Transactional
    public void createGastronomy() throws Exception {
        int databaseSizeBeforeCreate = gastronomyRepository.findAll().size();

        // Create the Gastronomy
        restGastronomyMockMvc.perform(post("/api/gastronomies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gastronomy)))
            .andExpect(status().isCreated());

        // Validate the Gastronomy in the database
        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeCreate + 1);
        Gastronomy testGastronomy = gastronomyList.get(gastronomyList.size() - 1);
        assertThat(testGastronomy.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGastronomy.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testGastronomy.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGastronomy.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testGastronomy.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testGastronomy.getContactName()).isEqualTo(DEFAULT_CONTACT_NAME);
        assertThat(testGastronomy.getAddressLine()).isEqualTo(DEFAULT_ADDRESS_LINE);
        assertThat(testGastronomy.getZipCode()).isEqualTo(DEFAULT_ZIP_CODE);
        assertThat(testGastronomy.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testGastronomy.getFacebookLink()).isEqualTo(DEFAULT_FACEBOOK_LINK);
        assertThat(testGastronomy.getTwitterLink()).isEqualTo(DEFAULT_TWITTER_LINK);
        assertThat(testGastronomy.getInstagramLink()).isEqualTo(DEFAULT_INSTAGRAM_LINK);
        assertThat(testGastronomy.getGofundmeName()).isEqualTo(DEFAULT_GOFUNDME_NAME);
        assertThat(testGastronomy.getSupportLink()).isEqualTo(DEFAULT_SUPPORT_LINK);
    }

    @Test
    @Transactional
    public void createGastronomyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gastronomyRepository.findAll().size();

        // Create the Gastronomy with an existing ID
        gastronomy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGastronomyMockMvc.perform(post("/api/gastronomies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gastronomy)))
            .andExpect(status().isBadRequest());

        // Validate the Gastronomy in the database
        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = gastronomyRepository.findAll().size();
        // set the field null
        gastronomy.setName(null);

        // Create the Gastronomy, which fails.

        restGastronomyMockMvc.perform(post("/api/gastronomies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gastronomy)))
            .andExpect(status().isBadRequest());

        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = gastronomyRepository.findAll().size();
        // set the field null
        gastronomy.setCategory(null);

        // Create the Gastronomy, which fails.

        restGastronomyMockMvc.perform(post("/api/gastronomies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gastronomy)))
            .andExpect(status().isBadRequest());

        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGastronomies() throws Exception {
        // Initialize the database
        gastronomyRepository.saveAndFlush(gastronomy);

        // Get all the gastronomyList
        restGastronomyMockMvc.perform(get("/api/gastronomies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gastronomy.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].contactName").value(hasItem(DEFAULT_CONTACT_NAME)))
            .andExpect(jsonPath("$.[*].addressLine").value(hasItem(DEFAULT_ADDRESS_LINE)))
            .andExpect(jsonPath("$.[*].zipCode").value(hasItem(DEFAULT_ZIP_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].facebookLink").value(hasItem(DEFAULT_FACEBOOK_LINK)))
            .andExpect(jsonPath("$.[*].twitterLink").value(hasItem(DEFAULT_TWITTER_LINK)))
            .andExpect(jsonPath("$.[*].instagramLink").value(hasItem(DEFAULT_INSTAGRAM_LINK)))
            .andExpect(jsonPath("$.[*].gofundmeName").value(hasItem(DEFAULT_GOFUNDME_NAME)))
            .andExpect(jsonPath("$.[*].supportLink").value(hasItem(DEFAULT_SUPPORT_LINK)));
    }
    
    @Test
    @Transactional
    @WithMockUser
    public void getGastronomy() throws Exception {
        // Initialize the database
        gastronomyRepository.saveAndFlush(gastronomy);

        // Get the gastronomy
        restGastronomyMockMvc.perform(get("/api/gastronomies/{id}", gastronomy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gastronomy.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.contactName").value(DEFAULT_CONTACT_NAME))
            .andExpect(jsonPath("$.addressLine").value(DEFAULT_ADDRESS_LINE))
            .andExpect(jsonPath("$.zipCode").value(DEFAULT_ZIP_CODE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.facebookLink").value(DEFAULT_FACEBOOK_LINK))
            .andExpect(jsonPath("$.twitterLink").value(DEFAULT_TWITTER_LINK))
            .andExpect(jsonPath("$.instagramLink").value(DEFAULT_INSTAGRAM_LINK))
            .andExpect(jsonPath("$.gofundmeName").value(DEFAULT_GOFUNDME_NAME))
            .andExpect(jsonPath("$.supportLink").value(DEFAULT_SUPPORT_LINK));
    }

    @Test
    @Transactional
    @WithMockUser
    public void getNonExistingGastronomy() throws Exception {
        // Get the gastronomy
        restGastronomyMockMvc.perform(get("/api/gastronomies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGastronomy() throws Exception {
        // Initialize the database
        gastronomyRepository.saveAndFlush(gastronomy);

        int databaseSizeBeforeUpdate = gastronomyRepository.findAll().size();

        // Update the gastronomy
        Gastronomy updatedGastronomy = gastronomyRepository.findById(gastronomy.getId()).get();
        // Disconnect from session so that the updates on updatedGastronomy are not directly saved in db
        em.detach(updatedGastronomy);
        updatedGastronomy
            .name(UPDATED_NAME)
            .category(UPDATED_CATEGORY)
            .description(UPDATED_DESCRIPTION)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .contactName(UPDATED_CONTACT_NAME)
            .addressLine(UPDATED_ADDRESS_LINE)
            .zipCode(UPDATED_ZIP_CODE)
            .city(UPDATED_CITY)
            .facebookLink(UPDATED_FACEBOOK_LINK)
            .twitterLink(UPDATED_TWITTER_LINK)
            .instagramLink(UPDATED_INSTAGRAM_LINK)
            .gofundmeName(UPDATED_GOFUNDME_NAME)
            .supportLink(UPDATED_SUPPORT_LINK);

        restGastronomyMockMvc.perform(put("/api/gastronomies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGastronomy)))
            .andExpect(status().isOk());

        // Validate the Gastronomy in the database
        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeUpdate);
        Gastronomy testGastronomy = gastronomyList.get(gastronomyList.size() - 1);
        assertThat(testGastronomy.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGastronomy.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testGastronomy.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGastronomy.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testGastronomy.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testGastronomy.getContactName()).isEqualTo(UPDATED_CONTACT_NAME);
        assertThat(testGastronomy.getAddressLine()).isEqualTo(UPDATED_ADDRESS_LINE);
        assertThat(testGastronomy.getZipCode()).isEqualTo(UPDATED_ZIP_CODE);
        assertThat(testGastronomy.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testGastronomy.getFacebookLink()).isEqualTo(UPDATED_FACEBOOK_LINK);
        assertThat(testGastronomy.getTwitterLink()).isEqualTo(UPDATED_TWITTER_LINK);
        assertThat(testGastronomy.getInstagramLink()).isEqualTo(UPDATED_INSTAGRAM_LINK);
        assertThat(testGastronomy.getGofundmeName()).isEqualTo(UPDATED_GOFUNDME_NAME);
        assertThat(testGastronomy.getSupportLink()).isEqualTo(UPDATED_SUPPORT_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingGastronomy() throws Exception {
        int databaseSizeBeforeUpdate = gastronomyRepository.findAll().size();

        // Create the Gastronomy

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGastronomyMockMvc.perform(put("/api/gastronomies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gastronomy)))
            .andExpect(status().isBadRequest());

        // Validate the Gastronomy in the database
        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGastronomy() throws Exception {
        // Initialize the database
        gastronomyRepository.saveAndFlush(gastronomy);

        int databaseSizeBeforeDelete = gastronomyRepository.findAll().size();

        // Delete the gastronomy
        restGastronomyMockMvc.perform(delete("/api/gastronomies/{id}", gastronomy.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Gastronomy> gastronomyList = gastronomyRepository.findAll();
        assertThat(gastronomyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
