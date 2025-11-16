package com.codetogive.codetogitteam3.dto.event;


import java.time.LocalDateTime;

public record DonationEventDTO(
        Long id,
        String name,
        String description,
        LocalDateTime createdAt
) {}