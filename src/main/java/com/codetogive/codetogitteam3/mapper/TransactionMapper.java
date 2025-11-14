package com.codetogive.codetogitteam3.Mapper;

import com.codetogive.codetogitteam3.DTO.DTOTransaction;
import com.codetogive.codetogitteam3.domain.Transaction;

public class TransactionMapper {
    public static DTOTransaction toDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }

        return new DTOTransaction(
                transaction.getId(),
                transaction.getUser() != null ? transaction.getUser().getId() : null,
                transaction.getSubscription() != null ? transaction.getSubscription().getId() :null,
                transaction.getAmount(),
                transaction.getTransactionTime(),
                transaction.getAnonymous()
        );
    }
}
