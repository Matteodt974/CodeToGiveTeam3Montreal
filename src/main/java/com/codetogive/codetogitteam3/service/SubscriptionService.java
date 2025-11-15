package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.Subscription.Status;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
  private final SubscriptionRepository repo;
  private final BadgeService badgeService;

  @Transactional
  public Subscription create(Subscription s) {
    s.setStatus(Status.ACTIVE);
    s.setStartedAt(LocalDateTime.now());
    s.setCumulativeTotal(0);
    return repo.save(s);
  }

  @Transactional
  public void cancel(String email) {
    Subscription s = repo.findByEmailAndStatus(email, Status.ACTIVE).orElseThrow();
    s.setStatus(Status.CANCELED);
    s.setCanceledAt(LocalDateTime.now());
  }

  public Subscription get(String email) {
    return repo.findByEmailAndStatus(email, Status.ACTIVE).orElseThrow();
  }

  // Cron: chaque 1er du mois à 02:00
  @Scheduled(cron = "0 0 2 1 * *")
  @Transactional
  public void processMonthlyCharge() {
    List<Subscription> actives = repo.findByStatus(Status.ACTIVE);
    for (Subscription s : actives) {
      s.setCumulativeTotal(s.getCumulativeTotal() + s.getAmount());
      checkMilestones(s);
    }
  }

  private void checkMilestones(Subscription s) {
    double total = s.getCumulativeTotal();
    if (total >= 100 && total < 250) badgeService.assignToUserByEmail("Supporter 100$", s.getEmail());
    if (total >= 250 && total < 500) badgeService.assignToUserByEmail("Supporter 250$", s.getEmail());
    if (total >= 500 && total < 1000) badgeService.assignToUserByEmail("Supporter 500$", s.getEmail());
    if (total >= 1000) badgeService.assignToUserByEmail("Pilier 1000$", s.getEmail());
  }
} // voir d'ou viennent les erreurs
