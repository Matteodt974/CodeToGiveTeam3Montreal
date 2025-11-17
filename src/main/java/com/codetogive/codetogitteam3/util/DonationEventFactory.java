package com.codetogive.codetogitteam3.util;

import com.codetogive.codetogitteam3.domain.DonationEvent;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

public class DonationEventFactory {
  public static List<DonationEvent> build() {
    return List.of(
        DonationEvent.builder()
            .title("2026 Annual Lilac Gala")
            .description("A fundraising event to support community programs and services.")
            .goalAmount(5000)
            .currentAmount(234.56)
            .startDate(LocalDate.of(2025, Month.JANUARY, 1))
            .endDate(LocalDate.of(2025, Month.JANUARY, 31))
            .build(),
        DonationEvent.builder()
            .title("Emergency Shelter Fundraiser")
            .description("Raising funds to create a new shelter in Laval and support for victims of conjugal violence.")
            .goalAmount(10000)
            .currentAmount(6023.11)
            .startDate(LocalDate.of(2026, Month.APRIL, 18))
            .endDate(LocalDate.of(2026, Month.APRIL, 18))
            .build());
  }
}
