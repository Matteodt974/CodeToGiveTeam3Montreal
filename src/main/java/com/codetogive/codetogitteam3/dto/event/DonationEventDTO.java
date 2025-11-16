package com.codetogive.codetogitteam3.dto.event;


import java.time.LocalDate;

public record DonationEventDTO(
        Long id,
        String title,
        String description,
        double goalAmount,
        double currentAmount,
        String startDate,
        String endDate
) {}