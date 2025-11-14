package com.codetogive.codetogitteam3.DTO;

import com.codetogive.codetogitteam3.domain.SubscriptionStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DTOSubscription(
        Long id,
        Long userId,
        BigDecimal amount,
        SubscriptionStatus status,
        LocalDateTime creatAt,
        LocalDateTime cancelAt
) {}
