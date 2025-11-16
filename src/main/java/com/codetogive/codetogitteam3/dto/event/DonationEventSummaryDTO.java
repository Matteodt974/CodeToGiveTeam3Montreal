package com.codetogive.codetogitteam3.dto.event;

import java.math.BigDecimal;

public record DonationEventSummaryDTO(
        Long eventId,
        String name,
        BigDecimal totalAmount,
        long donationCount
) {}
