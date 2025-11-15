package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.QuizOption;
import com.codetogive.codetogitteam3.domain.QuizQuestion;
import com.codetogive.codetogitteam3.domain.QuizResult;
import com.codetogive.codetogitteam3.repository.QuizQuestionRepository;
import com.codetogive.codetogitteam3.repository.QuizResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class QuizService {
  private final QuizQuestionRepository questionRepo;
  private final QuizResultRepository resultRepo;
  private final BadgeService badgeService;

  public List<QuizQuestion> getQuestions() {
    return questionRepo.findAll();
  }

  @Transactional
  public QuizResult submit(String email, Map<Long, Long> answers) {
    // answers: questionId -> optionId
    int score = 0;
    for (Map.Entry<Long, Long> e : answers.entrySet()) {
      QuizQuestion q = questionRepo.findById(e.getKey()).orElseThrow();
      Optional<QuizOption> opt = q.getOptions().stream().filter(o -> Objects.equals(o.getId(), e.getValue())).findFirst();
      if (opt.isPresent() && opt.get().isEmpathic()) score++;
    }
    String ending = score >= Math.max(1, answers.size() - 1) ? "Empathique" : "À sensibiliser";
    String badgeName = score >= Math.max(1, answers.size() - 1) ? "Protecteur" : "Apprenant";

    QuizResult res = resultRepo.save(QuizResult.builder()
      .email(email).score(score).ending(ending).badgeName(badgeName).build());

    // Attribuer badge si utilisateur connu
    badgeService.assignToUserByEmail(badgeName, email);
    return res;
  }
}
