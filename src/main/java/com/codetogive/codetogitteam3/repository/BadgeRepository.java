package com.codetogive.codetogitteam3.repository;

import com.codetogive.codetogitteam3.domain.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
  Optional<Badge> findByName(String name);
}