package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.domain.Transaction;
import com.codetogive.codetogitteam3.dto.transaction.TransactionResponseDTO;

public class TransactionMapper {
    public static TransactionResponseDTO toDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }

        return new TransactionResponseDTO(
                transaction.getId(),
                transaction.getUser() != null ? transaction.getUser().getId() : null,
                transaction.getSubscription() != null ? transaction.getSubscription().getId() :null,
                transaction.getEvent() != null ? transaction.getEvent().getId() : null,
                transaction.getAmount(),
                transaction.getAnonymous(),
                transaction.getTransactionTime()
                );
    }
}
