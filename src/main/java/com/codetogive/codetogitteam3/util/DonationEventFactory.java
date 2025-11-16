package com.codetogive.codetogitteam3.util;

import com.codetogive.codetogitteam3.domain.DonationEvent;

import java.util.List;

public class DonationEventFactory {
    public static List<DonationEvent> build() {
        return List.of(
                DonationEvent.builder()
                        .title("2025 Annual Lilac Gala")
                        .description("A fundraising event to support community programs and services.")
                        .goalAmount(10000)
                        .build(),
                DonationEvent.builder()
                        .title("Emergency Shelter Fundraiser")
                        .description("Raising funds to provide shelter and support for victims of conjugal violence.")
                        .goalAmount(5000)
                        .build()
        );
    }
}
