package com.codetogive.codetogitteam3.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

/** Configuration class to set up CORS settings for the application.
 * Allows cross-origin between frontend and backend during development.
 * Only for development purposes, prod/docker copies frontend to backend static files.
 **/
@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Value("${app.cors.allowed-origin:http://localhost:4200}")
  private String allowedOrigin;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins(allowedOrigin)
      .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
      .allowCredentials(true);
  }
}
