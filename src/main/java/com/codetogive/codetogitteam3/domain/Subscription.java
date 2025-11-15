package com.codetogive.codetogitteam3.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"user", "transactions"})
public class Subscription {
    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Column(precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Tier tier;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @Column(name = "started_at", nullable = false, updatable = false)
    private LocalDateTime startedAt;

    @Column(name = "canceled_at")
    private LocalDateTime canceledAt;

    @Column(name = "cumulative_total", nullable = false)
    private double cumulativeTotal;

    @OneToMany(mappedBy = "subscription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions = new ArrayList<>();
    //endregion

    //region Constructor
    @Builder
    public Subscription(User user, BigDecimal amount, Tier tier, Status status) {
        this.user = user;
        this.amount = amount;
        this.tier = tier;
        this.status = status;
    }
    //endregion

    //region Enums
    public enum Tier { GARDIEN, PROTECTEUR, CHAMPION, PILIER }
    public enum Status { ACTIVE, CANCELED }
    //endregion

    //region Methods
    @PrePersist
    protected void onCreate() {
        if (status == null) status = Status.ACTIVE;
        if (this.startedAt == null) this.startedAt = LocalDateTime.now();
    }
    //endregion
}
