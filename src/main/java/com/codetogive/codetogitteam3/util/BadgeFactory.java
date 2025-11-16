package com.codetogive.codetogitteam3.util;

import com.codetogive.codetogitteam3.domain.Badge;

import java.util.List;

public class BadgeFactory {
    public static List<Badge> build() {
        return List.of(
                Badge.builder().name("Protector").description("First Donation").icon("🛡️").build(),
                Badge.builder().name("Guardian").description("Monthly Supporter").icon("🌙").build(),
                Badge.builder().name("Champion").description("Major Donor").icon("🏆").build(),
                Badge.builder().name("First Guardian").description("Make your first donation").icon("🛡️").build(),
                Badge.builder().name("Voice for Change").description("Share your donation on social media").icon("📢").build(),
                Badge.builder().name("Monthly Protector").description("Set up a monthly subscription").icon("🌟").build(),
                Badge.builder().name("Major Supporter").description("Donate $500 or more").icon("💎").build(),
                Badge.builder().name("Event Champion").description("Participate in a special event").icon("🎯").build(),
                Badge.builder().name("Consistent Supporter").description("Donate 3 months in a row").icon("🔥").build(),
                Badge.builder().name("Community Helper").description("Submit a volunteer or help request").icon("🤝").build(),

                // Subscription milestone badges
                Badge.builder().name("Supporter 100$").description("Cumulative donations reached $100").icon("💰").build(),
                Badge.builder().name("Supporter 250$").description("Cumulative donations reached $250").icon("💵").build(),
                Badge.builder().name("Supporter 500$").description("Cumulative donations reached $500").icon("💴").build(),
                Badge.builder().name("Pilier 1000$").description("Cumulative donations reached $1000").icon("🏅").build()
        );
    }
}
