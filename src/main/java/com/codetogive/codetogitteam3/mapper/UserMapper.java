package com.codetogive.codetogitteam3.Mapper;

import com.codetogive.codetogitteam3.DTO.DTOUser;
import com.codetogive.codetogitteam3.domain.User;

public class UserMapper {
    public static DTOUser toDTO(User user) {
        if (user == null) {
            return null;
        }

        return new DTOUser(
                user.getId(),
                user.getEmail(),
                user.getDisplayName(),
                user.getFirstName(),
                user.getLastName(),
                user.getCreatedAt()
        );
    }
    public static User toEntity(DTOUser dto) {
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

    public static void upddateEntity(DTOUser dto, User user) {
        if (dto.email()!=null) {
            user.setEmail(dto.email());
        }
        if (dto.displayName()!=null) {
            user.setDisplayName(dto.displayName());
        }
        if (dto.firstName()!=null) {
            user.setFirstName(dto.firstName());
        }
        if (dto.lastName()!=null) {
            user.setLastName(dto.lastName());
        }
    }
}
