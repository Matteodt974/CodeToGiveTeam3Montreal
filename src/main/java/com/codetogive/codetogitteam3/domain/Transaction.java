package com.codetogive.codetogitteam3.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"user", "subscription", "event"})
public class Transaction {
    //region Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private DonationEvent event;

    @NotNull
    @Column(precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "transaction_time", updatable = false)
    private LocalDateTime transactionTime;

    @Column(name = "is_anonymous")
    private Boolean anonymous = Boolean.FALSE;
    //endregion

    //region Constructor
    @Builder
    public Transaction(User user, Subscription subscription, DonationEvent event, BigDecimal amount,
                       Boolean anonymous) {
        this.user = user;
        this.subscription = subscription;
        this.event = event;
        this.amount = amount;
        this.anonymous = (anonymous != null) ? anonymous : Boolean.FALSE;
    }
    //endregion

    @PrePersist
    protected void onCreate() {
        if(this.transactionTime == null) this.transactionTime = LocalDateTime.now();
    }
}

