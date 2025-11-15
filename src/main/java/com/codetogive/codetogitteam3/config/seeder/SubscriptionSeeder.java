package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import com.codetogive.codetogitteam3.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.math.BigDecimal;

@Configuration
@RequiredArgsConstructor
@Order(4)
public class SubscriptionSeeder implements CommandLineRunner {
    private final SubscriptionRepository subscriptionRepo;
    private final UserRepository userRepo;

    @Override
    @Transactional
    public void run(String... args) {
        if (subscriptionRepo.count() > 0) {
            return;
        }

        // Reuse an existing persisted user
        User firstUser = userRepo.findAll().stream().findFirst().orElse(null);
        if (firstUser == null) {
            // No users -> nothing to seed
            return;
        }

        Subscription sub = Subscription.builder()
                .user(firstUser)
                .amount(BigDecimal.valueOf(10))
                .tier(Subscription.Tier.CHAMPION)
                .status(Subscription.Status.ACTIVE)
                .build();
        sub.setCumulativeTotal(0d);

        subscriptionRepo.save(sub);
    }
}
