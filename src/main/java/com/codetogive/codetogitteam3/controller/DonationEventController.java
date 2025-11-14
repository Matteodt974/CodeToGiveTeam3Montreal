package com.codetogive.codetogitteam3.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/events")
public class DonationEventController {

  static class DonationEvent {
    public Long id;
    public String title;
    public String description;
    public double goalAmount;
    public double currentAmount;
    public LocalDate startDate;
    public LocalDate endDate;
  }

  private final Map<Long, DonationEvent> store = new ConcurrentHashMap<>();
  private long seq = 1;

  public DonationEventController() {
    DonationEvent e = new DonationEvent();
    e.id = seq++;
    e.title = "100 nuits sécuritaires";
    e.description = "Financer 100 nuitées au refuge Athena's House";
    e.goalAmount = 10000;
    e.currentAmount = 2500;
    e.startDate = LocalDate.now().minusDays(2);
    e.endDate = LocalDate.now().plusDays(12);
    store.put(e.id, e);
  }

  @GetMapping
  public ResponseEntity<List<DonationEvent>> list() {
    return ResponseEntity.ok(new ArrayList<>(store.values()));
  }

  @PostMapping
  public ResponseEntity<DonationEvent> create(@RequestBody DonationEvent payload) {
    payload.id = seq++;
    payload.currentAmount = 0;
    store.put(payload.id, payload);
    return ResponseEntity.ok(payload);
  }

  @PostMapping("/{id}/donate")
  public ResponseEntity<DonationEvent> donate(@PathVariable Long id, @RequestParam double amount) {
    DonationEvent e = store.get(id);
    if (e == null) return ResponseEntity.notFound().build();
    e.currentAmount += Math.max(0, amount);
    return ResponseEntity.ok(e);
  }
}
