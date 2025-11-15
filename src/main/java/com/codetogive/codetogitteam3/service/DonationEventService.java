package com.codetogive.codetogitteam3.service;


import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.codetogive.codetogitteam3.domain.Donation;
import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import com.codetogive.codetogitteam3.repository.DonationRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationEventService {
  private final DonationEventRepository eventRepo;
  private final DonationRepository donationRepo;
  private final ApplicationEventPublisher publisher;

  public List<DonationEvent> listActive() {
    return eventRepo.findByActiveTrue();
  }

  @Transactional
  public DonationEvent create(DonationEvent e) {
    DonationEvent saved = eventRepo.save(e);
    publisher.publishEvent(new DonationEventPublished(saved.getId()));
    return saved;
  }

  @Transactional
  public Donation donate(Long eventId, String donorName, String email, double amount) {
    if (amount <= 0) throw new IllegalArgumentException("Montant invalide");
    DonationEvent ev = eventRepo.findById(eventId).orElseThrow();
    if (!ev.isActive()) throw new IllegalStateException("Événement inactif");
    ev.setCurrentAmount(ev.getCurrentAmount() + amount);
    if (ev.getGoalAmount() > 0 && ev.getCurrentAmount() >= ev.getGoalAmount()) {
      ev.setActive(false);
    }
    Donation donation = donationRepo.save(Donation.builder()
      .event(ev).donorName(donorName).email(email).amount(amount).build());
    return donation;
  }

  @Getter
  public static class DonationEventPublished {
    private final Long eventId;
    public DonationEventPublished(Long eventId) { this.eventId = eventId; }
  }
}