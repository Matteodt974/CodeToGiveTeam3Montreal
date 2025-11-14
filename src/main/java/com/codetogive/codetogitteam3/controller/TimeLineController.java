package com.codetogive.codetogitteam3.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timeline")
public class TimeLineController {

  @GetMapping("/{userId}")
  public ResponseEntity<List<Map<String, Object>>> get(@PathVariable String userId) {
    List<Map<String, Object>> items = List.of(
      Map.of("ts", LocalDateTime.now().minusDays(30).toString(), "type", "DONATION", "amount", 50, "label", "Don unique"),
      Map.of("ts", LocalDateTime.now().minusDays(20).toString(), "type", "BADGE", "label", "Badge Protecteur"),
      Map.of("ts", LocalDateTime.now().minusDays(5).toString(), "type", "SUBSCRIPTION", "tier", "Gardien", "amount", 10)
    );
    return ResponseEntity.ok(items);
  }
} // classe contrôleur pour gérer la timeline des actions d'une personne venant aux shelters
  // modifier les données pour que ce soit la bonne timeline et le bon story telling
