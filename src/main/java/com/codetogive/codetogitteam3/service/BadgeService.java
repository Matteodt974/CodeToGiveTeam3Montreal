package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.Badge;
import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.dto.badge.BadgeDTO;
import com.codetogive.codetogitteam3.mapper.BadgeMapper;
import com.codetogive.codetogitteam3.repository.BadgeRepository;
import com.codetogive.codetogitteam3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeService {
    private final BadgeRepository badgeRepo;
    private final UserRepository userRepo;

    @Transactional(readOnly = true)
    public List<BadgeDTO> listAll() {
        return badgeRepo.findAll().stream()
                .map(BadgeMapper::toDTO)
                .toList();
    }

    @Transactional()
    public Badge getByName(String name) {
        return badgeRepo.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Badge not found: " + name));
    }

    @Transactional
    public BadgeDTO create(BadgeDTO dto) {
        if (badgeRepo.findByName(dto.name()).isPresent())
            return badgeRepo.findByName(dto.name())
                    .map(BadgeMapper::toDTO)
                    .orElseThrow();

        Badge badge = BadgeMapper.toEntity(dto);
        Badge savedBadge = badgeRepo.save(badge);
        return BadgeMapper.toDTO(savedBadge);
    }

    @Transactional
    public BadgeDTO getById(Long id) {
        Badge badge = badgeRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Badge not found with id: " + id));
        return BadgeMapper.toDTO(badge);
    }

    @Transactional
    public BadgeDTO update(Long id, BadgeDTO dto) {
        Badge badge = badgeRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Badge not found with id: " + id));
        BadgeMapper.updateEntity(badge, dto);
        Badge updatedBadge = badgeRepo.save(badge);
        return BadgeMapper.toDTO(updatedBadge);
    }

    @Transactional
    public void assignToUserByEmail(String badgeName, String email) {

        if (email == null || email.isBlank() || badgeName == null || badgeName.isBlank()) {
            throw new IllegalArgumentException("Email and Badge name must be provided");
        }

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Badge badge = badgeRepo.findByName(badgeName)
                .orElseThrow(() -> new IllegalArgumentException("Badge not found with name: " + badgeName));

        // Check for duplicate assignment
        if (!user.getBadges().contains(badge)) {
            user.getBadges().add(badge);
            badge.getUsers().add(user);
        }
    }

    @Transactional(readOnly = true)
    public List<BadgeDTO> getBadgesForUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        return user.getBadges().stream()
                .map(BadgeMapper::toDTO)
                .toList();
    }

}