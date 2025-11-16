package com.codetogive.codetogitteam3.util;

import com.codetogive.codetogitteam3.domain.User;

import java.util.List;

public class UserFactory {
    public static List<User> build() {
        return List.of(
                User.builder()
                        .email("george@test.com")
                        .displayName("George")
                        .firstName("George")
                        .lastName("Fam")
                        .passwordHash("$2a$10$demoHashedPasswordHere")
                        .build(),
                User.builder()
                        .email("john@test.com")
                        .displayName("John")
                        .firstName("John")
                        .lastName("Smith")
                        .passwordHash("$2a$10$demoHashedPasswordHere")
                        .build(),
                User.builder()
                        .email("jane@test.com")
                        .displayName("Jane")
                        .firstName("Jane")
                        .lastName("Doe")
                        .passwordHash("$2a$10$demoHashedPasswordHere")
                        .build()
        );
    }
}
