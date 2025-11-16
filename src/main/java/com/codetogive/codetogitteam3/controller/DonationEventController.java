package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.domain.Transaction;
import com.codetogive.codetogitteam3.service.DonationEventService;
import com.codetogive.codetogitteam3.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class DonationEventController {

    private final DonationEventService service;
    private final TransactionService txService;

    @GetMapping
    public List<DonationEvent> list() {
        return service.listActive();
    }

    @GetMapping("/{id}/transactions")
    public List<Transaction> getTransactionsByEvent(@PathVariable Long id) {
        return txService.getTransactionsByEvent(id);
    }

    @PostMapping
    public ResponseEntity<DonationEvent> create(@RequestBody DonationEvent payload) {
        return ResponseEntity.ok(service.create(payload));
    }

    @PostMapping("/{id}/donate")
    public ResponseEntity<Transaction> donate(@PathVariable Long id, @RequestParam String donorName,
                                              @RequestParam String email, @RequestParam double amount) {
        return ResponseEntity.ok(service.donate(id, donorName, email, amount));
    }
}
