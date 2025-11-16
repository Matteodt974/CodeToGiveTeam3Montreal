package com.codetogive.codetogitteam3.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timeline")
public class TimeLineController {

  @GetMapping
  public ResponseEntity<List<Map<String, Object>>> get(@PathVariable String userId) {
    List<Map<String, Object>> items = List.of(
            Map.of(
                    "step", 1,
                    "ts", LocalDateTime.now().minusDays(45).toString(),
                    "type", "CRISIS_CALL",
                    "icon", "🚨",
                    "title", "Crisis Call",
                    "label", "Emergency hotline call at 2am",
                    "story", "Sarah* calls our 24/7 hotline with her two children (ages 6 and 9)",
                    "cost", 75
            ),
            Map.of(
                    "step", 2,
                    "ts", LocalDateTime.now().minusDays(40).toString(),
                    "type", "SHELTER",
                    "icon", "🏠",
                    "title", "Emergency Shelter",
                    "label", "Safe accommodation",
                    "story", "30 days in a secure shelter while staff create a safety plan",
                    "cost", 1050
            ),
            Map.of(
                    "step", 3,
                    "ts", LocalDateTime.now().minusDays(32).toString(),
                    "type", "THERAPY",
                    "icon", "🌱",
                    "title", "Healing Begins",
                    "label", "Therapy & counseling",
                    "story", "Trauma counseling for Sarah, art therapy for the children, legal support",
                    "cost", 300
            ),
            Map.of(
                    "step", 4,
                    "ts", LocalDateTime.now().minusDays(20).toString(),
                    "type", "SKILLS",
                    "icon", "🎓",
                    "title", "Building Skills",
                    "label", "Training & workshops",
                    "story", "Job training, financial literacy, parenting support workshops",
                    "cost", 200
            ),
            Map.of(
                    "step", 5,
                    "ts", LocalDateTime.now().minusDays(10).toString(),
                    "type", "INDEPENDENCE",
                    "icon", "🏡",
                    "title", "Independence",
                    "label", "Permanent housing",
                    "story", "Sarah finds stable employment and moves into safe permanent housing",
                    "cost", 150
            ),
            Map.of(
                    "step", 6,
                    "ts", LocalDateTime.now().minusDays(2).toString(),
                    "type", "THRIVING",
                    "icon", "🌟",
                    "title", "Thriving",
                    "label", "Ongoing stability",
                    "story", "Children excel in school; Sarah becomes a peer mentor for other survivors",
                    "cost", 100
            )
    );
    return ResponseEntity.ok(items);
  }
} // classe contrôleur pour gérer la timeline des actions d'une personne venant aux shelters
  // modifier les données pour que ce soit la bonne timeline et le bon story telling
