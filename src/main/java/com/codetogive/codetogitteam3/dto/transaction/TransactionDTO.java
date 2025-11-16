package com.codetogive.codetogitteam3.dto.transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionDTO(
    Long id,
    Long userId,
    Long subscriptionId,
    BigDecimal amount,
    LocalDateTime transctionTime,
    Boolean anonymous
)
{}
