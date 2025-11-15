package com.codetogive.codetogitteam3.repository;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.Subscription.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
  Optional<Subscription> findByEmailAndStatus(String email, Status status);
  List<Subscription> findByStatus(Status status);
}