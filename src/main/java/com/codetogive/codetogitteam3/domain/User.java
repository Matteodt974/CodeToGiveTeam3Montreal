package com.codetogive.codetogitteam3.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"subscription", "transactions", "badges"})
public class User {
    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true) // DTO à faire
    private String email;

    @NotBlank
    @Column(name = "display_name", nullable = false, unique = true, length = 15)
    private String displayName;

    @NotBlank
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "first_name", length = 50) // DTO à faire
    private String firstName;

    @Column(name = "last_name", length = 50) // DTO à faire
    private String lastName;

    @Column(name = "created_at") // DTO à faire
    private LocalDate createdAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // DTO à faire
    private Subscription subscription;

    @OneToMany(mappedBy = "user")
    private List<Transaction> transactions = new ArrayList<>();

    @ManyToMany(mappedBy = "users")
    private Set<Badge> badges = new HashSet<>();
    //endregion

    //region Constructor
    @Builder
    public User(String email, String displayName, String passwordHash, String firstName, String lastName) {
        this.email = email;
        this.displayName = displayName;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    //endregion

    @PrePersist
    protected void onCreate() {
        if(this.createdAt == null) this.createdAt = LocalDate.now();
    }
}
