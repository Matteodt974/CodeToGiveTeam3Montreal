package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import jakarta.mail.internet.InternetAddress;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MailNotificationListener {
  private final SubscriptionRepository subRepo;
  private final DonationEventRepository eventRepo;
  private final JavaMailSender mailSender;

  @TransactionalEventListener
  public void onDonationEventPublished(DonationEventService.DonationEventPublished evt) {
    DonationEvent ev = eventRepo.findById(evt.getEventId()).orElse(null);
    if (ev == null) return;

    List<Subscription> recipients = subRepo.findByStatus(Subscription.Status.ACTIVE);
    if (recipients.isEmpty()) return;

    for (Subscription s : recipients) {
      SimpleMailMessage msg = new SimpleMailMessage();
      msg.setTo(s.getEmail());
      msg.setSubject("[Athena] Nouvel événement: " + ev.getTitle());
      msg.setText("Objectif: " + ev.getGoalAmount() + " — " + ev.getDescription());
      mailSender.send(msg);
    }
  }
} // envoie d'un mail a ceux qui ont une subscription active quand un evenement de don est cree