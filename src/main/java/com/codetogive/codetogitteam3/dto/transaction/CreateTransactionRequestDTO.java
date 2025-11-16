package com.codetogive.codetogitteam3.dto.transaction;

public record CreateTransactionRequestDTO(
        String donorName,
        String email,
        double amount,
        boolean anonymous
) {}
