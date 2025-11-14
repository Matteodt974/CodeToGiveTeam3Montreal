package com.codetogive.codetogitteam3.Mapper;

import com.codetogive.codetogitteam3.DTO.DTOSubscription;
import com.codetogive.codetogitteam3.domain.Subscription;

public class SubscriptionMapper {
    public static DTOSubscription toDTO(Subscription sub) {
        if (sub == null) {
            return null;
        }

        return new DTOSubscription(
                sub.getId(),
                sub.getUser() != null ? sub.getUser().getId() : null,
                sub.getAmount(),
                sub.getStatus(),
                sub.getCreatedAt(),
                sub.getCanceledAt()
        );
    }
}
