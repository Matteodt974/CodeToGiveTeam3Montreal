package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.subscription.CreateSubscriptionRequestDTO;
import com.codetogive.codetogitteam3.dto.subscription.SubscriptionDTO;
import com.codetogive.codetogitteam3.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
@Tag(name = "Subscriptions", description = "Manage User subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @PostMapping
    @Operation(summary = "Create a subscription")
    public ResponseEntity<SubscriptionDTO> create(@RequestBody @Valid CreateSubscriptionRequestDTO req) {
        return ResponseEntity.ok(subscriptionService.create(req));
    }

    @DeleteMapping
    @Operation(summary = "Cancel a subscription")
    public ResponseEntity<Void> cancel(@RequestParam String email) {
        subscriptionService.cancel(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(summary = "Get a subscription by email")
    public ResponseEntity<SubscriptionDTO> get(@RequestParam String email) {
        return ResponseEntity.ok(subscriptionService.get(email));
    }
}