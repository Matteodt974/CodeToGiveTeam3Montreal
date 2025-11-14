package com.codetogive.codetogitteam3.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

  static class SubscriptionDTO {
    public String tier; // Gardien / Protecteur / Champion / Pilier
    public double amount;
    public String email;
    public String status; // ACTIVE / CANCELED
  }

  private final Map<String, SubscriptionDTO> byEmail = new ConcurrentHashMap<>();

  @PostMapping
  public ResponseEntity<SubscriptionDTO> create(@RequestBody SubscriptionDTO dto) {
    dto.status = "ACTIVE";
    byEmail.put(dto.email, dto);
    return ResponseEntity.ok(dto);
  }

  @DeleteMapping
  public ResponseEntity<Void> cancel(@RequestParam String email) {
    SubscriptionDTO dto = byEmail.get(email);
    if (dto == null) return ResponseEntity.notFound().build();
    dto.status = "CANCELED";
    return ResponseEntity.noContent().build();
  }

  @GetMapping
  public ResponseEntity<SubscriptionDTO> get(@RequestParam String email) {
    SubscriptionDTO dto = byEmail.get(email);
    if (dto == null) return ResponseEntity.notFound().build();
    return ResponseEntity.ok(dto);
  }
}