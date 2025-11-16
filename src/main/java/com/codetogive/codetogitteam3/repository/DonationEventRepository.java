package com.codetogive.codetogitteam3.repository;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationEventRepository extends JpaRepository<DonationEvent, Long> {
  List<DonationEvent> findByActiveTrue();
}
