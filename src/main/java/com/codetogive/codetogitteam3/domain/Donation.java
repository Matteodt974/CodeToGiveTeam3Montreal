package com.codetogive.codetogitteam3.domain;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Donation {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String donorName;

  private String email;

  @Column(nullable = false)
  private double amount;

  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "event_id")
  private DonationEvent event;

  private LocalDateTime createdAt;

  @PrePersist
  void pre() {
    if (createdAt == null) createdAt = LocalDateTime.now();
  }
}