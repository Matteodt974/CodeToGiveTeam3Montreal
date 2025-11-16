package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.badge.BadgeDTO;
import com.codetogive.codetogitteam3.repository.UserRepository;
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
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<BadgeDTO>> listAll() {
        return ResponseEntity.ok(badgeService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BadgeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(badgeService.getById(id));
    }

    @PostMapping
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

    // hardcoded user for demo purposes
    @GetMapping("/me")
    public ResponseEntity<List<BadgeDTO>> getMyBadges() {
        return ResponseEntity.ok(badgeService
                .getBadgesForUser(
                        userRepository
                                .findByEmail("george@test.com")
                                .get().getId()));
    }
}
