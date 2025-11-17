package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.Transaction;
import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import com.codetogive.codetogitteam3.repository.TransactionRepository;
import com.codetogive.codetogitteam3.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Order(5)
public class TransactionSeeder implements CommandLineRunner {
    private final TransactionRepository transactionRepo;
    private final UserRepository userRepo;
    private final SubscriptionRepository subscriptionRepo;
    private final DonationEventRepository eventRepo;

    @Override
    @Transactional
    public void run(String... args) {
        if (transactionRepo.count() > 0) {
            return;
        }

        User user = userRepo.findAll().stream().skip(1).findFirst().orElse(null);
        if (user == null) return;

        Subscription sub = subscriptionRepo
                .findByUser_EmailAndStatus(user.getEmail(), Subscription.Status.ACTIVE)
                .orElse(null);

        DonationEvent event = eventRepo.findAll().stream().findFirst().orElse(null);

        List<Transaction> txs = new ArrayList<>();

        // Simple standalone donation
        txs.add(Transaction.builder()
                .user(user)
                .amount(BigDecimal.valueOf(10))
                .subscription(sub)
                .anonymous(false)
                .build());

        // Donation linked to an event if there is one
        if (event != null) {
            txs.add(Transaction.builder()
                    .user(user)
                    .subscription(sub)
                    .event(event)
                    .amount(BigDecimal.valueOf(25))
                    .anonymous(false)
                    .build());
        }

        // Another one-off donation
        txs.add(Transaction.builder()
                .user(user)
                .amount(BigDecimal.valueOf(50))
                .anonymous(false)
                .build());

        transactionRepo.saveAll(txs);
    }
}
