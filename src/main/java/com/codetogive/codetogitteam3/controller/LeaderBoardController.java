package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.dto.leaderboard.LeaderBoardEntry;
import com.codetogive.codetogitteam3.service.LeaderBoardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class LeaderBoardController {

    private final LeaderBoardService leaderBoardService;

    public LeaderBoardController(LeaderBoardService leaderBoardService) {
        this.leaderBoardService = leaderBoardService;
    }

    @GetMapping
    public List<LeaderBoardEntry> getLeaderBoard() {
        return leaderBoardService.getLeaderBoard();
    }


}
