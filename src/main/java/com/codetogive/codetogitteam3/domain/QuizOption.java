package com.codetogive.codetogitteam3.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quiz_options")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class QuizOption {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "question_id", nullable = false)
  private QuizQuestion question;

  @Column(nullable = false, length = 300)
  private String text;

  @Column(name = "is_empathic", nullable = false)
  private boolean empathic;
}
