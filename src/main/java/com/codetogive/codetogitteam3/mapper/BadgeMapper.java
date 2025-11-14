package com.codetogive.codetogitteam3.Mapper;

import com.codetogive.codetogitteam3.DTO.DTOBadge;
import com.codetogive.codetogitteam3.domain.Badge;

public class BadgeMapper {
    public static DTOBadge toDTO(Badge badge) {
        if (badge == null) {
            return null;
        }

        return new DTOBadge(
                badge.getId(),
                badge.getName(),
                badge.getDescription(),
                badge.getIconUrl()
        );
    }

    public static Badge toEntity (DTOBadge dto) {
        if (dto == null) {
            return null;
        }

        return Badge.builder()
                .name(dto.name())
                .description(dto.description())
                .iconUrl(dto.iconUrl())
                .build();
    }

    public static void  updateEntity(Badge badge, DTOBadge dto) {
        if (dto.name()!= null) {
            badge.setName(dto.name());
        }
        if (dto.description()!= null) {
            badge.setDescription(dto.description());
        }
        if (dto.iconUrl()!= null) {
            badge.setIconUrl(dto.iconUrl());
        }
    }
}
