package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import com.codetogive.codetogitteam3.util.DonationEventFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@RequiredArgsConstructor
@Order(3)
public class DonationEventSeeder implements CommandLineRunner {
    private final DonationEventRepository eventRepo;

    @Override
    public void run(String... args) throws Exception {
        if(eventRepo.count() == 0) eventRepo.saveAll(DonationEventFactory.build());
    }

}
