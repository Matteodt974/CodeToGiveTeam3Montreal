package com.codetogive.codetogitteam3.repository;


import com.codetogive.codetogitteam3.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByEventId(Long eventId);
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId")
    Double findTotalByUserId(Long userId);

    @Query("SELECT t.user.id AS userId, SUM(t.amount) AS total " +
            "FROM Transaction t " +
            "GROUP BY t.user.id " +
            "ORDER BY SUM(t.amount) DESC")
    List<TopUserProjection> findTopUsers(Pageable pageable);
}
