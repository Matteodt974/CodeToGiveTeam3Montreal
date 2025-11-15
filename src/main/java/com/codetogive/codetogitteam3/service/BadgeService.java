package com.codetogive.codetogitteam3.service;

import com.codetogive.codetogitteam3.domain.Badge;
import com.codetogive.codetogitteam3.domain.User;
import com.codetogive.codetogitteam3.repository.BadgeRepository;
import com.codetogive.codetogitteam3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BadgeService {
  private final BadgeRepository badgeRepo;
  private final UserRepository userRepo;

  @Transactional
  public Badge getOrCreate(String name, String desc, String iconUrl) {
    return badgeRepo.findByName(name).orElseGet(() ->
      badgeRepo.save(Badge.builder().name(name).description(desc).iconUrl(iconUrl).build()));
  }

  @Transactional
  public void assignToUserByEmail(String badgeName, String email) {
    userRepo.findByEmail(email).ifPresent(user -> {
      Badge badge = getOrCreate(badgeName, null, null);
      user.getBadges().add(badge);
      badge.getUsers().add(user);
    });
  }
}