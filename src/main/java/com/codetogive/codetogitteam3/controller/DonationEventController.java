package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.dto.event.DonationEventDTO;
import com.codetogive.codetogitteam3.dto.event.DonationRequestDTO;
import com.codetogive.codetogitteam3.dto.transaction.TransactionResponseDTO;
import com.codetogive.codetogitteam3.mapper.DonationEventMapper;
import com.codetogive.codetogitteam3.mapper.TransactionMapper;
import com.codetogive.codetogitteam3.service.DonationEventService;
import com.codetogive.codetogitteam3.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@Tag(name = "Events", description = "Donation events and related operations")
public class DonationEventController {

    private final DonationEventService service;
    private final TransactionService txService;

    @GetMapping
    @Operation(summary = "List active donation events")
    public ResponseEntity<List<DonationEventDTO>> list() {
        return ResponseEntity.ok(service.listActive()
                .stream()
                .map(DonationEventMapper::toDTO)
                .toList()
        );
    }

    @GetMapping("/{id}/transactions")
    @Operation(summary = "Get transactions for an event")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByEvent(@PathVariable Long id) {
        return ResponseEntity.ok(txService.getTransactionsByEvent(id).stream()
                .map(TransactionMapper::toDTO)
                .toList()
        );
    }

    @PostMapping
    @Operation(summary = "Create a donation event")
    public ResponseEntity<DonationEventDTO> create(@RequestBody DonationEvent payload) {
        return ResponseEntity.ok(DonationEventMapper.toDTO(service.create(payload)));
    }

    @PostMapping("/{id}/donate")
    @Operation(summary = "Donate to a donation event")
    public ResponseEntity<TransactionResponseDTO> donate(@PathVariable Long id, @RequestBody DonationRequestDTO req) {
        return ResponseEntity.ok(TransactionMapper.toDTO(service.donate(id, req.email(), req.amount())));
    }
}
