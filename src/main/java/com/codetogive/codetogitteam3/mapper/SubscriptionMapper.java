package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.dto.subscription.SubscriptionDTO;
import com.codetogive.codetogitteam3.domain.Subscription;

public class SubscriptionMapper {
    public static SubscriptionDTO toDTO(Subscription sub) {
        if (sub == null) {
            return null;
        }

        return new SubscriptionDTO(
                sub.getId(),
                sub.getUser() != null ? sub.getUser().getId() : null,
                sub.getAmount(),
                sub.getStatus(),
                sub.getTier(),
                sub.getStartedAt(),
                sub.getCanceledAt(),
                sub.getCumulativeTotal()
        );
    }
}
