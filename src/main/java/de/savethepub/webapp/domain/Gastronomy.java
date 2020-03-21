package de.savethepub.webapp.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import de.savethepub.webapp.domain.enumeration.GastronomyCategory;

/**
 * Bar, restaurant etc..
 */
@ApiModel(description = "Bar, restaurant etc..")
@Entity
@Table(name = "gastronomy")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Gastronomy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private GastronomyCategory category;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "contact_mail")
    private String contactMail;

    /**
     * First line of the address, e.g. street and house number
     */
    @ApiModelProperty(value = "First line of the address, e.g. street and house number")
    @Column(name = "address_line")
    private String addressLine;

    @Size(max = 5)
    @Column(name = "zip_code", length = 5)
    private String zipCode;

    @Column(name = "city")
    private String city;

    @Column(name = "facebook_link")
    private String facebookLink;

    @Column(name = "twitter_link")
    private String twitterLink;

    @Column(name = "instagram_link")
    private String instagramLink;

    /**
     * Link to supporting page, e.g. crowd funding, online order service
     */
    @ApiModelProperty(value = "Link to supporting page, e.g. crowd funding, online order service")
    @Column(name = "support_link")
    private String supportLink;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Gastronomy name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GastronomyCategory getCategory() {
        return category;
    }

    public Gastronomy category(GastronomyCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(GastronomyCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public Gastronomy description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Gastronomy photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Gastronomy photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getContactName() {
        return contactName;
    }

    public Gastronomy contactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactMail() {
        return contactMail;
    }

    public Gastronomy contactMail(String contactMail) {
        this.contactMail = contactMail;
        return this;
    }

    public void setContactMail(String contactMail) {
        this.contactMail = contactMail;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public Gastronomy addressLine(String addressLine) {
        this.addressLine = addressLine;
        return this;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getZipCode() {
        return zipCode;
    }

    public Gastronomy zipCode(String zipCode) {
        this.zipCode = zipCode;
        return this;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public Gastronomy city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public Gastronomy facebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
        return this;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public Gastronomy twitterLink(String twitterLink) {
        this.twitterLink = twitterLink;
        return this;
    }

    public void setTwitterLink(String twitterLink) {
        this.twitterLink = twitterLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public Gastronomy instagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
        return this;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }

    public String getSupportLink() {
        return supportLink;
    }

    public Gastronomy supportLink(String supportLink) {
        this.supportLink = supportLink;
        return this;
    }

    public void setSupportLink(String supportLink) {
        this.supportLink = supportLink;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Gastronomy)) {
            return false;
        }
        return id != null && id.equals(((Gastronomy) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Gastronomy{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", category='" + getCategory() + "'" +
            ", description='" + getDescription() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", contactName='" + getContactName() + "'" +
            ", contactMail='" + getContactMail() + "'" +
            ", addressLine='" + getAddressLine() + "'" +
            ", zipCode='" + getZipCode() + "'" +
            ", city='" + getCity() + "'" +
            ", facebookLink='" + getFacebookLink() + "'" +
            ", twitterLink='" + getTwitterLink() + "'" +
            ", instagramLink='" + getInstagramLink() + "'" +
            ", supportLink='" + getSupportLink() + "'" +
            "}";
    }
}
