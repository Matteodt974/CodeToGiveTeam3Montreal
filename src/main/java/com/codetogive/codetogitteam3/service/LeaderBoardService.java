package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.Transaction;
import com.codetogive.codetogitteam3.dto.leaderboard.LeaderBoardEntry;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
public class LeaderBoardService {

    private final SubscriptionRepository subscriptionRepository;

    public LeaderBoardService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<LeaderBoardEntry> getLeaderBoard() {

        List<Subscription> subscriptions = subscriptionRepository.findAll();

        return subscriptions.stream()
                .map(sub -> {
                    BigDecimal total = sub.getTransactions().stream()
                            .map(Transaction::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    return new LeaderBoardEntry(
                            sub.getUser().getId(),
                            sub.getUser().getDisplayName(),
                            total
                    );
                })
                .sorted(Comparator.comparing(LeaderBoardEntry::totalAmount).reversed())
                .toList();
    }
}
