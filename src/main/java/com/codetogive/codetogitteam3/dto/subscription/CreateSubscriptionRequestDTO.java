package com.codetogive.codetogitteam3.dto;

import com.codetogive.codetogitteam3.domain.Subscription;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record CreateSubscriptionRequestDTO(
        @Email String email, // TODO: swap later to authenticated user
        @NotNull @Positive BigDecimal amount,
        @NotNull Subscription.Tier tier
) {}
