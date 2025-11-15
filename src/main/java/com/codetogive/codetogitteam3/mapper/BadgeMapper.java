package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.dto.badge.BadgeDTO;
import com.codetogive.codetogitteam3.domain.Badge;

public class BadgeMapper {
    public static BadgeDTO toDTO(Badge badge) {
        if (badge == null) {
            return null;
        }

        return new BadgeDTO(
                badge.getId(),
                badge.getName(),
                badge.getDescription(),
                badge.getIcon()
        );
    }

    public static Badge toEntity(BadgeDTO dto) {
        if (dto == null) {
            return null;
        }

        return Badge.builder()
                .name(dto.name())
                .description(dto.description())
                .icon(dto.icon())
                .build();
    }

    public static void updateEntity(Badge badge, BadgeDTO dto) {
        if (dto.name() != null) {
            badge.setName(dto.name());
        }
        if (dto.description() != null) {
            badge.setDescription(dto.description());
        }
        if (dto.icon() != null) {
            badge.setIcon(dto.icon());
        }
    }
}
