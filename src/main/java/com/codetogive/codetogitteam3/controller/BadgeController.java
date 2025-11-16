package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.dto.badge.BadgeDTO;
import com.codetogive.codetogitteam3.repository.UserRepository;
import com.codetogive.codetogitteam3.service.BadgeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
@RequiredArgsConstructor
@Tag(name = "Badges", description = "Operations related to badges")
public class BadgeController {
    private final BadgeService badgeService;
    private final UserRepository userRepository;

    @GetMapping
    @Operation(summary = "List all badges")
    public ResponseEntity<List<BadgeDTO>> listAll() {
        return ResponseEntity.ok(badgeService.listAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a badge by id")
    public ResponseEntity<BadgeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(badgeService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new badge")
    public ResponseEntity<BadgeDTO> create(@RequestBody @Valid BadgeDTO dto) {
        return ResponseEntity.ok(badgeService.create(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a badge")
    public ResponseEntity<BadgeDTO> update(@PathVariable Long id, @RequestBody @Valid BadgeDTO dto) {
        return ResponseEntity.ok(badgeService.update(id, dto));
    }

    @GetMapping("user/{id}")
    @Operation(summary = "Get badges for a user")
    public ResponseEntity<List<BadgeDTO>> getBadgesByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(badgeService.getBadgesForUser(id));
    }

    // hardcoded user for demo purposes
    @GetMapping("/me")
    @Operation(summary = "Get badges for the logged in user")
    public ResponseEntity<List<BadgeDTO>> getMyBadges() {
        Long userId = userRepository.findByEmail("george@test.com")
                .map(User::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Demo user not found"));
        return ResponseEntity.ok(badgeService.getBadgesForUser(userId));
    }
}
