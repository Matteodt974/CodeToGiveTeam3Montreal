import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  // Badges disponibles (tous les badges du système)
  allBadges: Badge[] = [];

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
    this.loadUserProfile();
    this.loadBadges();
    console.log(this.currentUserId);
  }

  loadBadges(): void {
    this.loading = true;
    this.error = null;

    // Charger tous les badges disponibles
    this.http.get<Badge[]>(`${this.apiBase}/badges`).subscribe({
      next: (badges) => {
        this.allBadges = badges;
        // Après avoir chargé tous les badges, charger ceux de l'utilisateur
        this.loadUserBadges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des badges:', err);
        this.error = 'Impossible de charger les badges. Veuillez réessayer.';
        this.loading = false;
      },
    });
  }

  private loadUserBadges(): void {
    this.http
      .get<Badge[]>(`${this.apiBase}/badges/user/${this.currentUserId}`)
      .subscribe({
        next: (badges) => {
          this.userBadges = badges;
          this.userBadgeIds = new Set(badges.map((b) => b.id));
          this.loading = false;
        },
        error: (err) => {
          console.error(
            'Erreur lors du chargement des badges utilisateur:',
            err
          );
          // En cas d'erreur, on considère que l'utilisateur n'a pas de badges
          this.userBadges = [];
          this.userBadgeIds = new Set();
          this.loading = false;
        },
      });
    console.log(this.currentUserId);
    console.log(this.allBadges);
    console.log(this.userBadgeIds);
  }

  private loadUserProfile(): void {
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

  isUnlocked(badgeId: number): boolean {
    return this.userBadgeIds.has(badgeId);
  }

  getProgress(badge: Badge): number {
    if (this.isUnlocked(badge.id)) {
      return 100;
    }
    return 0;
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
    this.loadUserBadges();
  }
}
