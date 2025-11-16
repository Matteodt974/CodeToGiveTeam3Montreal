package com.codetogive.codetogitteam3.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Shield of Athena API")
                        .version("v1")
                        .description("API documentation for the Shield of Athena donation platform")
                        .contact(new Contact().name("George Fam").email("fam.george@courrier.uqam.ca"))
                );
    }
}

