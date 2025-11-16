package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import com.codetogive.codetogitteam3.service.DonationEventService.DonationEventPublished;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;

/**
 * Sends email to active subscribers when a new donation event is published.
 * TODO: Replace Email Crafting with AI Generated Content (Spring AI Integration)
 */
@Component
@RequiredArgsConstructor
public class MailNotificationListener {
    private final SubscriptionRepository subRepo;
    private final DonationEventRepository eventRepo;
    private final JavaMailSender mailSender;

    @Async
    @TransactionalEventListener
    public void onDonationEventPublished(DonationEventPublished evt) {
        DonationEvent ev = eventRepo.findById(evt.eventId()).orElse(null);
        if (ev == null) return;

        List<Subscription> recipients = subRepo.findByStatus(Subscription.Status.ACTIVE);
        if (recipients.isEmpty()) return;

        for (Subscription s : recipients) {
            if (s.getUser() == null || s.getUser().getEmail() == null)
                continue;

            String email = s.getUser().getEmail();

            // Email Validation
            try {
                new InternetAddress(email, true);
            } catch (AddressException e) {
                continue;
            }

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(email);
            msg.setSubject("[Athena] Nouvel événement: " + ev.getTitle());
            msg.setText("Objectif: " + ev.getGoalAmount() + " — " + ev.getDescription());
            mailSender.send(msg);
        }
    }
}