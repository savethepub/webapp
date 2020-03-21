package de.savethepub.webapp;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("de.savethepub.webapp");

        noClasses()
            .that()
                .resideInAnyPackage("de.savethepub.webapp.service..")
            .or()
                .resideInAnyPackage("de.savethepub.webapp.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..de.savethepub.webapp.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
