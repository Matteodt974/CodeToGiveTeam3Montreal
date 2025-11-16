package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.repository.UserRepository;
import com.codetogive.codetogitteam3.util.UserFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@RequiredArgsConstructor
@Order(1)
public class UserSeeder implements CommandLineRunner {
    private final UserRepository repo;

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() == 0) repo.saveAll(UserFactory.build());
    }
}
