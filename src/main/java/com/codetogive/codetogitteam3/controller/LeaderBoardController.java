package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.repository.TopUserProjection;
import com.codetogive.codetogitteam3.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
@Tag(name = "LeaderBoard", description = "Leaderboard showing user rankings")
public class LeaderBoardController {
    private final TransactionService txService;

    @GetMapping("/{n}")
    @Operation(summary = "Get the leaderboard")
    public List<TopUserProjection> getLeaderBoard(@PathVariable("n") Integer n) {
       return txService.getTopUsers(n);
    }


}
