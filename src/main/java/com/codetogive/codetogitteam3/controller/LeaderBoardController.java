package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.leaderboard.LeaderBoardEntry;
import com.codetogive.codetogitteam3.service.LeaderBoardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/leaderboard")
@Tag(name = "LeaderBoard", description = "Leaderboard showing user rankings")
public class LeaderBoardController {

    private final LeaderBoardService leaderBoardService;

    public LeaderBoardController(LeaderBoardService leaderBoardService) {
        this.leaderBoardService = leaderBoardService;
    }

    @GetMapping
    @Operation(summary = "Get the leaderboard")
    public List<LeaderBoardEntry> getLeaderBoard() {
        return leaderBoardService.getLeaderBoard();
    }


}
