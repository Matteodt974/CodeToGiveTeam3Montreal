import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface UserProfile {
  totalDonated: number;
  familiesHelped: number;
  donationCount: number;
  shareCount: number;
}

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  anonymous: boolean;
  createdAt: string;
}

// Configuration des badges cumulatifs avec leurs seuils
interface CumulativeBadgeConfig {
  threshold: number;
  badgeName: string;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
})
export class AchievementsComponent implements OnInit {
  private http = inject(HttpClient);
  private apiBase = environment.apiBase;

  // Configuration des badges cumulatifs (ordonnés par seuil)
  private cumulativeBadges: CumulativeBadgeConfig[] = [
    { threshold: 100, badgeName: 'Supporter 100$' },
    { threshold: 250, badgeName: 'Supporter 250$' },
    { threshold: 500, badgeName: 'Supporter 500$' },
    { threshold: 1000, badgeName: 'Pilier 1000$' },
  ];

  // Badges disponibles (tous les badges du système)
  allBadges: Badge[] = [];

  // Badges filtrés à afficher (avec la logique cumulative)
  displayBadges: Badge[] = [];

  // Badges débloqués par l'utilisateur
  userBadges: Badge[] = [];
  userBadgeIds: Set<number> = new Set();

  // État de chargement
  loading = true;
  error: string | null = null;

  // ID de l'utilisateur (à récupérer depuis un service d'auth ou localStorage)
  currentUserId: number = 1; // TODO: Remplacer par l'ID réel de l'utilisateur connecté

  userProfile: UserProfile = {
    totalDonated: 0,
    familiesHelped: 0,
    donationCount: 0,
    shareCount: 0,
  };

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData(): void {
    console.log('Loading all user data and badges...');
    this.loading = true;
    this.error = null;

    // Charger toutes les données en parallèle
    forkJoin({
      totalDonated: this.http.get<number>(
        `${this.apiBase}/users/${this.currentUserId}/transactions/total`
      ),
      transactions: this.http.get<Transaction[]>(
        `${this.apiBase}/transactions/user/${this.currentUserId}`
      ),
      allBadges: this.http.get<Badge[]>(`${this.apiBase}/badges`),
      userBadges: this.http.get<Badge[]>(
        `${this.apiBase}/badges/user/${this.currentUserId}`
      ),
    }).subscribe({
      next: (result) => {
        // Mettre à jour le profil utilisateur
        this.userProfile.totalDonated = result.totalDonated || 0;
        this.userProfile.donationCount = result.transactions.length;
        console.log('Total Donated:', this.userProfile.totalDonated);
        console.log('Donation Count:', this.userProfile.donationCount);

        // Mettre à jour les badges
        this.allBadges = result.allBadges;
        console.log('All badges loaded:', this.allBadges);

        this.userBadges = result.userBadges;
        console.log('User badges from API:', this.userBadges);

        this.userBadgeIds = new Set(result.userBadges.map((b) => b.id));
        console.log('User badge IDs:', Array.from(this.userBadgeIds));

        // Sauvegarder dans localStorage
        this.saveUserProfile();

        // Vérifier et assigner les badges mérités
        this.checkAndAssignBadges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données:', err);
        this.error = 'Impossible de charger les données. Veuillez réessayer.';
        this.loading = false;
        this.loadUserProfileFromStorage();
      },
    });
  }

  private checkAndAssignBadges(): void {
    const badgesToAssign: number[] = [];

    // Vérifier le badge "First Donation" (Protector)
    if (this.userProfile.donationCount > 0) {
      const firstDonationBadge = this.allBadges.find(
        (b) => b.name === 'Protector'
      );
      if (firstDonationBadge && !this.userBadgeIds.has(firstDonationBadge.id)) {
        badgesToAssign.push(firstDonationBadge.id);
      }
    }

    // Vérifier les badges cumulatifs basés sur le total donné
    for (const config of this.cumulativeBadges) {
      if (this.userProfile.totalDonated >= config.threshold) {
        const badge = this.allBadges.find((b) => b.name === config.badgeName);
        if (badge && !this.userBadgeIds.has(badge.id)) {
          badgesToAssign.push(badge.id);
        }
      }
    }

    // Si des badges doivent être assignés, appeler l'API
    if (badgesToAssign.length > 0) {
      console.log('Assigning badges:', badgesToAssign);
      this.assignBadges(badgesToAssign);
    } else {
      // Pas de nouveaux badges à assigner, filtrer et terminer
      this.filterDisplayBadges();
      this.loading = false;
    }
  }

  private assignBadges(badgeIds: number[]): void {
    // L'API ajoute les badges aux badges existants (pas de remplacement)
    console.log('Sending badge IDs to assign:', badgeIds);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': environment.apiKey,
    });

    this.http
      .post<Badge[]>(
        `${this.apiBase}/badges/user/${this.currentUserId}/assign`,
        badgeIds,
        { headers }
      )
      .subscribe({
        next: (updatedBadges) => {
          console.log('Badges assigned successfully:', updatedBadges);
          console.log(
            'Updated badge IDs:',
            updatedBadges.map((b) => b.id)
          );

          // Mettre à jour les badges de l'utilisateur
          this.userBadges = updatedBadges;
          this.userBadgeIds = new Set(updatedBadges.map((b) => b.id));
          console.log('User badge IDs set:', Array.from(this.userBadgeIds));

          // Afficher les toasts pour les nouveaux badges
          for (const badgeId of badgeIds) {
            const badge = this.allBadges.find((b) => b.id === badgeId);
            if (badge) {
              this.showAchievementToast(badge);
            }
          }

          // Filtrer les badges à afficher
          this.filterDisplayBadges();
          this.loading = false;
        },
        error: (err) => {
          console.error("Erreur lors de l'assignation des badges:", err);
          // Continuer même en cas d'erreur
          this.filterDisplayBadges();
          this.loading = false;
        },
      });
  }

  loadBadges(): void {
    this.loadAllData();
  }

  private filterDisplayBadges(): void {
    // Trouver le prochain badge cumulatif non débloqué
    const nextCumulativeBadgeName = this.getNextCumulativeBadgeName();

    // Filtrer les badges à afficher
    this.displayBadges = this.allBadges.filter((badge) => {
      // Vérifier si c'est un badge cumulatif
      const isCumulativeBadge = this.cumulativeBadges.some(
        (cb) => cb.badgeName === badge.name
      );

      if (!isCumulativeBadge) {
        // Si ce n'est pas un badge cumulatif, toujours l'afficher
        return true;
      }

      // Si c'est un badge cumulatif débloqué, l'afficher
      if (this.isUnlocked(badge.id)) {
        return true;
      }

      // Si c'est le prochain badge cumulatif à débloquer, l'afficher
      if (badge.name === nextCumulativeBadgeName) {
        return true;
      }

      // Sinon, ne pas afficher ce badge cumulatif
      return false;
    });
  }

  private getNextCumulativeBadgeName(): string | null {
    // Trouver le prochain badge cumulatif basé sur le total donné
    for (const config of this.cumulativeBadges) {
      const badge = this.allBadges.find((b) => b.name === config.badgeName);
      if (badge && !this.isUnlocked(badge.id)) {
        return config.badgeName;
      }
    }
    return null; // Tous les badges cumulatifs sont débloqués
  }

  private loadUserProfileFromStorage(): void {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      this.userProfile = {
        totalDonated: profile.totalDonated || 0,
        familiesHelped: profile.familiesHelped || 0,
        donationCount: profile.donationCount || 0,
        shareCount: profile.shareCount || 0,
      };
    }
  }

  private saveUserProfile(): void {
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
  }

  isUnlocked(badgeId: number): boolean {
    const unlocked = this.userBadgeIds.has(badgeId);
    // Debug log - à retirer en production
    // console.log(`Badge ${badgeId} unlocked:`, unlocked, 'UserBadgeIds:', Array.from(this.userBadgeIds));
    return unlocked;
  }

  getProgress(badge: Badge): number {
    if (this.isUnlocked(badge.id)) {
      return 100;
    }

    // Calculer la progression pour les badges cumulatifs
    const cumulativeConfig = this.cumulativeBadges.find(
      (cb) => cb.badgeName === badge.name
    );

    if (cumulativeConfig) {
      const progress =
        (this.userProfile.totalDonated / cumulativeConfig.threshold) * 100;
      return Math.min(progress, 99); // Max 99% si pas encore débloqué
    }

    return 0;
  }

  getProgressText(badge: Badge): string {
    const cumulativeConfig = this.cumulativeBadges.find(
      (cb) => cb.badgeName === badge.name
    );

    if (cumulativeConfig && !this.isUnlocked(badge.id)) {
      const remaining =
        cumulativeConfig.threshold - this.userProfile.totalDonated;
      if (remaining > 0) {
        return `$${this.userProfile.totalDonated.toFixed(2)} / $${
          cumulativeConfig.threshold
        }`;
      }
    }

    return '';
  }

  scrollToDonation(): void {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private showAchievementToast(badge: Badge): void {
    const toast = document.createElement('div');
    toast.className =
      'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${badge.icon}</span>
        <div>
          <div class="font-semibold">Achievement Unlocked!</div>
          <div class="text-sm">${badge.name}</div>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  refreshBadges(): void {
    this.loadAllData();
  }
}
