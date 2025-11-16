package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.Transaction;
import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.dto.transaction.CreateTransactionRequestDTO;
import com.codetogive.codetogitteam3.repository.TopUserProjection;
import com.codetogive.codetogitteam3.repository.TransactionRepository;
import com.codetogive.codetogitteam3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository txRepo;
    private final UserRepository userRepo;

    @Transactional
    public Transaction createDonation(CreateTransactionRequestDTO req) {
        User user = userRepo.findByEmail(req.email())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Transaction tx = Transaction.builder()
                .user(user)
                .amount(BigDecimal.valueOf(req.amount()))
                .anonymous(req.anonymous())
                .build();
        return txRepo.save(tx);
    }

    @Transactional(readOnly = true)
    public List<Transaction> getByUser(Long userId) {
        return txRepo.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<Transaction> getAll() {
        return txRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Transaction get(Long id){
        return txRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));
    }

    @Transactional(readOnly = true)
    public List<Transaction> getTransactionsByEvent(Long eventId) {
        return txRepo.findByEventId(eventId);
    }

    public List<TopUserProjection> getTopUsers(Integer n) {
        return txRepo.findTopUsers(PageRequest.of(0, n));
    }
}
