package com.codetogive.codetogitteam3.dto.transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionResponseDTO(
        Long id,
        Long userId,
        Long subscriptionId,
        Long eventId,
        BigDecimal amount,
        boolean anonymous,
        LocalDateTime transactionTime
) {}
