package com.codetogive.codetogitteam3.repository;


import com.codetogive.codetogitteam3.domain.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<Donation, Long> {}