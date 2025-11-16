package com.codetogive.codetogitteam3.dto.leaderboard;

import java.math.BigDecimal;

public record LeaderBoardEntry(
        Long userId,
        String userName,
        BigDecimal totalAmount
) {}
