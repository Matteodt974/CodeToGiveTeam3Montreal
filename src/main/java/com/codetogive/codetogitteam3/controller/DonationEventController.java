package com.codetogive.codetogitteam3.controller;


import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.service.DonationEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class DonationEventController {

  private final DonationEventService service;

  @GetMapping
  public List<DonationEvent> list() {
    return service.listActive();
  }

  @PostMapping
  public ResponseEntity<DonationEvent> create(@RequestBody DonationEvent payload) {
    return ResponseEntity.ok(service.create(payload));
  }

  @PostMapping("/{id}/donate")
  public ResponseEntity<DonationEvent> donate(@PathVariable Long id, @RequestParam double amount) {
    return ResponseEntity.ok(service.donate(id, amount));
  }
}
