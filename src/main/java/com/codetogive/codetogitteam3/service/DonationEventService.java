package com.codetogive.codetogitteam3.service;


import com.codetogive.codetogitteam3.domain.*;
import com.codetogive.codetogitteam3.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import lombok.Getter;
import org.springframework.context.ApplicationEventPublisher;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationEventService {
    private final DonationEventRepository eventRepo;
    private final TransactionRepository transactionRepo;
    private final UserRepository userRepo;
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
    public Transaction donate(Long eventId, String donorName, String email, double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Montant invalide");

        DonationEvent ev = eventRepo.findById(eventId).orElseThrow();
        if (!ev.isActive()) throw new IllegalStateException("Événement inactif");
        ev.setCurrentAmount(ev.getCurrentAmount() + amount);
        if (ev.getGoalAmount() > 0 && ev.getCurrentAmount() >= ev.getGoalAmount()) {
            ev.setActive(false);
        }
        User user = userRepo.findByEmail(email)
                .orElseThrow(()-> new IllegalArgumentException("Utilisateur non trouvé"));

        return transactionRepo.save(Transaction.builder()
                .user(user)
                .event(ev)
                .amount(BigDecimal.valueOf(amount))
                .anonymous(false)
                .build()
        );
    }

    public record DonationEventPublished(Long eventId) { }
}