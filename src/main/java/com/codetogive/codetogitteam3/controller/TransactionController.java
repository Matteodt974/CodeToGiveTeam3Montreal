package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.transaction.CreateTransactionRequestDTO;
import com.codetogive.codetogitteam3.dto.transaction.TransactionResponseDTO;
import com.codetogive.codetogitteam3.mapper.TransactionMapper;
import com.codetogive.codetogitteam3.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Tag(name = "Transactions", description = "Donation transactions")
public class TransactionController {
    private final TransactionService service;

    @PostMapping
    @Operation(summary = "Create a donation transaction")
    public ResponseEntity<TransactionResponseDTO> donate(@RequestBody CreateTransactionRequestDTO req) {
        return ResponseEntity.ok(TransactionMapper.toDTO(service.createDonation(req)));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get transactions for a user")
    public ResponseEntity<List<TransactionResponseDTO>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId).stream()
                .map(TransactionMapper::toDTO)
                .toList()
        );
    }

    @GetMapping
    @Operation(summary = "List all transactions")
    public ResponseEntity<List<TransactionResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll().stream()
                .map(TransactionMapper::toDTO)
                .toList()
        );
    }

    @GetMapping("/{transactionId}")
    @Operation(summary = "Get a transaction by id")
    public ResponseEntity<TransactionResponseDTO> getById(@PathVariable Long transactionId) {
        return ResponseEntity.ok(TransactionMapper.toDTO(service.get(transactionId)));
    }
}
