import { Component, Input } from '@angular/core';

interface Badge {
  id: string;
  name: string;
  minDonations: number;
  icon: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-donor-badges',
  templateUrl: './donor-badges.component.html',
  styleUrls: ['./donor-badges.component.css'],
  standalone: true
})
export class DonnerBadgesComponent {
  @Input() donationCount: number = 0;

  badges: Badge[] = [
    {
      id: 'novice',
      name: 'Novice',
      minDonations: 1,
      icon: '🌱',
      color: '#90EE90',
      description: 'Votre première donation - Merci!'
    },
    {
      id: 'supporter',
      name: 'Supporter',
      minDonations: 5,
      icon: '⭐',
      color: '#FFD700',
      description: '5 donations - Vous êtes un grand supporter!'
    },
    {
      id: 'champion',
      name: 'Champion',
      minDonations: 10,
      icon: '🏆',
      color: '#FFA500',
      description: '10 donations - Vous êtes un champion!'
    },
    {
      id: 'legend',
      name: 'Legend',
      minDonations: 25,
      icon: '👑',
      color: '#FF1493',
      description: '25 donations - Vous êtes une légende!'
    }
  ];

  get earnedBadges(): Badge[] {
    return this.badges.filter(badge => this.donationCount >= badge.minDonations);
  }

  get nextBadge(): Badge | null {
    const unearned = this.badges.find(badge => this.donationCount < badge.minDonations);
    return unearned || null;
  }

  get progressToNextBadge(): number {
    if (!this.nextBadge) return 100;
    const currentBadgeIndex = this.badges.findIndex(b => b.id === this.nextBadge?.id);
    const currentMinDonations = currentBadgeIndex > 0 ? this.badges[currentBadgeIndex - 1].minDonations : 0;
    const nextMinDonations = this.nextBadge.minDonations;
    const progress = ((this.donationCount - currentMinDonations) / (nextMinDonations - currentMinDonations)) * 100;
    return Math.min(progress, 100);
  }
}