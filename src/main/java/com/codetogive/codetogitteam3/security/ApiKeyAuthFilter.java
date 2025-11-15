package com.codetogive.codetogitteam3.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ApiKeyAuthFilter extends OncePerRequestFilter {

  @Value("${app.security.api-key:}")
  private String apiKey;

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
    throws ServletException, IOException {
    String method = req.getMethod();
    boolean mutation = !(HttpMethod.GET.matches(method) || HttpMethod.OPTIONS.matches(method));
    if (mutation && !req.getRequestURI().startsWith("/actuator")) {
      String provided = req.getHeader("X-API-KEY");
      if (apiKey == null || apiKey.isBlank() || !apiKey.equals(provided)) {
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        res.getWriter().write("Unauthorized");
        return;
      }
    }
    chain.doFilter(req, res);
  }
}