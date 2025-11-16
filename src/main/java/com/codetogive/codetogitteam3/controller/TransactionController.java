package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.transaction.CreateTransactionRequestDTO;
import com.codetogive.codetogitteam3.dto.transaction.TransactionResponseDTO;
import com.codetogive.codetogitteam3.mapper.TransactionMapper;
import com.codetogive.codetogitteam3.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> donate(@RequestBody CreateTransactionRequestDTO req) {
        return ResponseEntity.ok(TransactionMapper.toDTO(service.createDonation(req)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionResponseDTO>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId).stream()
                .map(TransactionMapper::toDTO)
                .toList()
        );
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll().stream()
                .map(TransactionMapper::toDTO)
                .toList()
        );
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionResponseDTO> getById(@PathVariable Long transactionId) {
        return ResponseEntity.ok(TransactionMapper.toDTO(service.get(transactionId)));
    }
}
