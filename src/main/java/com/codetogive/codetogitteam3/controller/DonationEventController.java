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

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class DonationEventController {

    private final DonationEventService service;
    private final TransactionService txService;

    @GetMapping
    public ResponseEntity<List<DonationEventDTO>> list() {
        return ResponseEntity.ok(service.listActive()
                .stream()
                .map(DonationEventMapper::toDTO)
                .toList()
        );
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByEvent(@PathVariable Long id) {
        return ResponseEntity.ok(txService.getTransactionsByEvent(id).stream()
                .map(TransactionMapper::toDTO)
                .toList()
        );
    }

    @PostMapping
    public ResponseEntity<DonationEventDTO> create(@RequestBody DonationEvent payload) {
        return ResponseEntity.ok(DonationEventMapper.toDTO(service.create(payload)));
    }

    @PostMapping("/{id}/donate")
    public ResponseEntity<TransactionResponseDTO> donate(@PathVariable Long id, DonationRequestDTO req) {
        return ResponseEntity.ok(TransactionMapper.toDTO(service.donate(id, req.email(), req.amount())));
    }
}
