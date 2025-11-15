package com.codetogive.codetogitteam3.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "donation_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationEvent {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(length = 1000)
  private String description;

  @Column(nullable = false)
  private double goalAmount;

  @Column(nullable = false)
  private double currentAmount;

  private LocalDate startDate;
  private LocalDate endDate;

  @Version
  private Long version;

  @Column(nullable = false)
  private boolean active;

  @PrePersist
  void init() {
    if (currentAmount < 0) currentAmount = 0;
    if (goalAmount < 0) goalAmount = 0;
    active = true;
  }
}