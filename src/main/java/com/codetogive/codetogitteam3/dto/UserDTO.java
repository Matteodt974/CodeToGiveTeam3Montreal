package com.codetogive.codetogitteam3.DTO;

import java.time.LocalDate;

public record DTOUser (
        Long id,
        String email,
        String displayName,
        String firstName,
        String lastName,
        LocalDate createAt
) {}
