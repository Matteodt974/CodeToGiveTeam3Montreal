package com.codetogive.codetogitteam3.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "badges")
@Getter
@Setter
@NoArgsConstructor
public class Badge {
    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(length = 50)
    private String name;

    @Column
    private String description;

    @Column(name = "icon_url")
    private String iconUrl;

    @ManyToMany
    @JoinTable(
            name = "user_badges",
            joinColumns = @JoinColumn(name = "badge_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();
    //endregion

    //region Constructor
    @Builder
    public Badge(String name, String description, String iconUrl) {
        this.iconUrl = iconUrl;
        this.name = name;
        this.description = description;
    }
    //endregion

}
