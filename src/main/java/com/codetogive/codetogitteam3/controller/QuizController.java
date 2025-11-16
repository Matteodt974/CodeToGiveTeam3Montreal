package com.codetogive.codetogitteam3.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/quiz")
@Tag(name = "Quiz", description = "Interactive quiz to evaluate awareness and provide badges")
public class QuizController {

  private static final List<Map<String, Object>> QUESTIONS = List.of(
    Map.of(
      "id", 1,
      "text", "Vous entendez des cris chez vos voisins tard le soir. Que faites-vous ?",
      "options", List.of(
        Map.of("id", "A", "text", "Ignorer, ce n’est pas mes affaires"),
        Map.of("id", "B", "text", "Appeler discrètement une ligne d’aide"),
        Map.of("id", "C", "text", "Aller confronter immédiatement la personne")
      )
    ),
    Map.of(
      "id", 2,
      "text", "Une amie se confie sur un contrôle excessif de son partenaire.",
      "options", List.of(
        Map.of("id", "A", "text", "Lui dire que ce n’est sûrement pas si grave"),
        Map.of("id", "B", "text", "L’écouter et proposer des ressources"),
        Map.of("id", "C", "text", "En parler au partenaire")
      )
    )
  );

  @GetMapping("/questions")
  @Operation(summary = "Get quiz questions")
  public ResponseEntity<List<Map<String, Object>>> getQuestions() {
    return ResponseEntity.ok(QUESTIONS);
  }

  @PostMapping("/submit")
  @Operation(summary = "Submit quiz answers and receive score/badge")
  public ResponseEntity<Map<String, Object>> submit(@RequestBody Map<String, String> answers) {
    // Scoring simple: chaque réponse "B" est considérée empathique.
    long score = answers.values().stream().filter("B"::equals).count();
    String ending = score >= 2 ? "Empathique" : "À sensibiliser";
    String badge = score >= 2 ? "Protecteur" : "Apprenant";

    Map<String, Object> result = new HashMap<>();
    result.put("score", score);
    result.put("ending", ending);
    result.put("badge", badge);
    result.put("stats", List.of(
      "Chaque année, des milliers de personnes sont soutenues par Shield of Athena.",
      "Votre choix peut orienter une personne vers de l’aide concrète."
    ));
    return ResponseEntity.ok(result);
  }
}