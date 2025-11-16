package com.codetogive.codetogitteam3.dto.subscription;

import com.codetogive.codetogitteam3.domain.Subscription;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SubscriptionDTO(
        Long id,
        Long userId,
        @NotNull BigDecimal amount,
        Subscription.Status status,
        Subscription.Tier tier,
        LocalDateTime createdAt,
        LocalDateTime canceledAt,
        double cumulativeTotal) {
}
