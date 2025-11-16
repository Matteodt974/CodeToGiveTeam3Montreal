package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.repository.QuizQuestionRepository;
import com.codetogive.codetogitteam3.util.QuizFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class QuizSeeder implements CommandLineRunner {
    private final QuizQuestionRepository questionRepo;

    @Override
    public void run(String... args) throws Exception {
        if (questionRepo.count() == 0) questionRepo.saveAll(QuizFactory.build());
    }
}
