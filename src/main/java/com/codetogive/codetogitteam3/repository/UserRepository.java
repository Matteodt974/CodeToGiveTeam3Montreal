package com.codetogive.codetogitteam3.repository;

import com.codetogive.codetogitteam3.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
}