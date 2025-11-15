package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.BadgeDTO;
import com.codetogive.codetogitteam3.service.BadgeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
@RequiredArgsConstructor
public class BadgeController {
    private final BadgeService badgeService;

    @GetMapping
    public ResponseEntity<List<BadgeDTO>> listAll() {
        return ResponseEntity.ok(badgeService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BadgeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(badgeService.getById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<BadgeDTO> create(@RequestBody @Valid BadgeDTO dto) {
        return ResponseEntity.ok(badgeService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BadgeDTO> update(@PathVariable Long id, @RequestBody @Valid BadgeDTO dto) {
        return ResponseEntity.ok(badgeService.update(id, dto));
    }

    @GetMapping("user/{id}")
    public ResponseEntity<List<BadgeDTO>> getBadgesByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(badgeService.getBadgesForUser(id));
    }

    @GetMapping("/me")
    public ResponseEntity<List<BadgeDTO>> getMyBadges() {
        // TODO: Implement method to get badges for the authenticated user, maybe move to UserController
        return ResponseEntity.ok(List.of());
    }
}
