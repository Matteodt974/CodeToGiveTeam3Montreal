package com.codetogive.codetogitteam3.dto;

import java.time.LocalDate;

public record UserDTO(
        Long id,
        String email,
        String displayName,
        String firstName,
        String lastName,
        LocalDate createAt
) {}
