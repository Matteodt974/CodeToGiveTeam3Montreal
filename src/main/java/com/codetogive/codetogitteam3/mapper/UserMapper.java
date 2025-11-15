package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.dto.UserDTO;
import com.codetogive.codetogitteam3.domain.User;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getDisplayName(),
                user.getFirstName(),
                user.getLastName(),
                user.getCreatedAt()
        );
    }
    public static User toEntity(UserDTO dto) {
        if (dto == null) {
            return null;
        }

        return User.builder()
                .email(dto.email())
                .displayName(dto.displayName())
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .build();
    }

    public static void updateEntity(UserDTO dto, User user) {
        if (dto == null || user == null) return;
        if (dto.email() != null) user.setEmail(dto.email());
        if (dto.displayName() != null) user.setDisplayName(dto.displayName());
        if (dto.firstName() != null) user.setFirstName(dto.firstName());
        if (dto.lastName() != null) user.setLastName(dto.lastName());
    }
}
