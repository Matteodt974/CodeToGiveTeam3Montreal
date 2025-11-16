package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.repository.TransactionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Operations related to users")
public class UserController {
    private final TransactionRepository transactionRepository;

    @GetMapping("/{id}/transactions/total")
    @Operation(summary = "Get total transaction amount for a user")
    public Double total(@PathVariable Long id) {
        Double res = transactionRepository.findTotalByUserId(id);
        return res != null ? res : 0.0;
    }

}
