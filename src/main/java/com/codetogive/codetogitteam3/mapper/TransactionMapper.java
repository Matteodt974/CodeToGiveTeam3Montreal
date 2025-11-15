package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.dto.TransactionDTO;
import com.codetogive.codetogitteam3.domain.Transaction;

public class TransactionMapper {
    public static TransactionDTO toDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }

        return new TransactionDTO(
                transaction.getId(),
                transaction.getUser() != null ? transaction.getUser().getId() : null,
                transaction.getSubscription() != null ? transaction.getSubscription().getId() :null,
                transaction.getAmount(),
                transaction.getTransactionTime(),
                transaction.getAnonymous()
        );
    }
}
