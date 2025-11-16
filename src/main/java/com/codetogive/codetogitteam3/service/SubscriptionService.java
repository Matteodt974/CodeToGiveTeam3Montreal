package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.Subscription.Status;
import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.dto.subscription.CreateSubscriptionRequestDTO;
import com.codetogive.codetogitteam3.dto.subscription.SubscriptionDTO;
import com.codetogive.codetogitteam3.mapper.SubscriptionMapper;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import com.codetogive.codetogitteam3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository repo;
    private final UserRepository userRepo;
    private final BadgeService badgeService;

    @Transactional
    public SubscriptionDTO create(CreateSubscriptionRequestDTO req) {
        User user = userRepo.findByEmail(req.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email: " +
                        req.email()));

        // Max One Active Subscription per User
        if (repo.findByUser_EmailAndStatus(user.getEmail(), Status.ACTIVE).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already has an active subscription");
        }

        Subscription sub = Subscription.builder()
                .user(user)
                .amount(req.amount())
                .tier(req.tier())
                .status(Status.ACTIVE)
                .build();
        sub.setCumulativeTotal(req.amount().doubleValue());

        Subscription s = repo.save(sub);

        return SubscriptionMapper.toDTO(s);
    }

    @Transactional
    public void cancel(String email) {
        Subscription s = repo
                .findByUser_EmailAndStatus(email, Status.ACTIVE)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "Active subscription not found " +
                        "for email: " + email));
        s.setStatus(Status.CANCELED);
        s.setCanceledAt(LocalDateTime.now());
        repo.save(s);
        repo.flush();
    }

    public SubscriptionDTO get(String email) {
        Subscription s = repo
                .findByUser_EmailAndStatus(email, Status.ACTIVE)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Active subscription not found for email: " + email));
        return SubscriptionMapper.toDTO(s);
    }

    // Cron: chaque 1er du mois à 02:00
    @Scheduled(cron = "0 0 2 1 * *")
    @Transactional
    public void processMonthlyCharge() {
        List<Subscription> actives = repo.findByStatus(Status.ACTIVE);
        for (Subscription s : actives) {
            s.setCumulativeTotal(s.getCumulativeTotal() + s.getAmount().doubleValue());
            repo.save(s);
            checkMilestones(s);
        }
    }

    private void checkMilestones(Subscription s) {
        double total = s.getCumulativeTotal();
        String email = s.getUser().getEmail();
        if (total >= 100 && total < 250 && s.getUser().getBadges()
                .stream().noneMatch(b -> b.getDescription().equals("Supporter 100$"))) {
            badgeService.assignToUserByEmail("Supporter 100$", email);
        }
        if (total >= 250 && total < 500 && s.getUser().getBadges().stream()
                .noneMatch(b -> b.getDescription().equals("Supporter 250$"))) {
            badgeService.assignToUserByEmail("Supporter 250$", email);
        }
        if (total >= 500 && total < 1000 && s.getUser().getBadges().stream()
                .noneMatch(b -> b.getDescription().equals("Supporter 500$"))) {
            badgeService.assignToUserByEmail("Supporter 500$", email);
        }
        if (total >= 1000 && s.getUser().getBadges().stream()
                .noneMatch(b -> b.getDescription().equals("Pilier 1000$"))) {
            badgeService.assignToUserByEmail("Pilier 1000$", email);
        }
    }
} // voir d'ou viennent les erreurs
