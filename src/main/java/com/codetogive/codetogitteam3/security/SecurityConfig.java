package com.codetogive.codetogitteam3.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http, ApiKeyAuthFilter apiKeyFilter) throws Exception {
    http.csrf(csrf -> csrf.disable());
    http.authorizeHttpRequests(reg -> reg
      .requestMatchers("/actuator/**").permitAll()
      .requestMatchers("/api/**").permitAll() // filtré par ApiKeyAuthFilter pour mutations
      .anyRequest().permitAll()
    );
    http.addFilterBefore(apiKeyFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
