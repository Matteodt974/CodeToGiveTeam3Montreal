package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.repository.BadgeRepository;
import com.codetogive.codetogitteam3.util.BadgeFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@RequiredArgsConstructor
@Order(2)
public class BadgeSeeder implements CommandLineRunner {
    private final BadgeRepository badgeRepo;

    @Override
    public void run(String... args) throws Exception {
        if(badgeRepo.count() == 0) badgeRepo.saveAll(BadgeFactory.build());
    }
}
