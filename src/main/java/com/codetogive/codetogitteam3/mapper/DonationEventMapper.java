package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.dto.event.DonationEventDTO;

public class DonationEventMapper {
    public static DonationEventDTO toDTO(DonationEvent event) {
        if (event == null) {
            return null;
        }

        return new DonationEventDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getGoalAmount(),
                event.getCurrentAmount(),
                event.getStartDate().toString(),
                event.getEndDate().toString()
        );
    }
}
