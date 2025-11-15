import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  requirement?: number;
}

interface UserProfile {
  totalDonated: number;
  familiesHelped: number;
  donationCount: number;
  shareCount: number;
  achievements: string[];
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  achievements: Achievement[] = [
    {
      id: 'first-donation',
      icon: '🛡️',
      title: 'First Guardian',
      description: 'Make your first donation'
    },
    {
      id: 'social-share',
      icon: '📢',
      title: 'Voice for Change',
      description: 'Share your donation on social media'
    },
    {
      id: 'monthly-donor',
      icon: '⭐',
      title: 'Monthly Protector',
      description: 'Set up a monthly subscription'
    },
    {
      id: 'big-donor',
      icon: '💎',
      title: 'Major Supporter',
      description: 'Donate $500 or more',
      requirement: 500
    },
    {
      id: 'event-participant',
      icon: '🎯',
      title: 'Event Champion',
      description: 'Participate in a special event'
    },
    {
      id: 'consistent-supporter',
      icon: '🔥',
      title: 'Consistent Supporter',
      description: 'Donate 3 months in a row'
    },
    {
      id: 'community-helper',
      icon: '🤝',
      title: 'Community Helper',
      description: 'Submit a volunteer or help request'
    },
    {
      id: 'quiz-participant',
      icon: '🧠',
      title: 'Knowledge Seeker',
      description: 'Complete the family violence awareness quiz'
    },
    {
      id: 'quiz-learner',
      icon: '📚',
      title: 'Informed Supporter',
      description: 'Score 1-2 points on the awareness quiz'
    },
    {
      id: 'quiz-scholar',
      icon: '🎓',
      title: 'Awareness Advocate',
      description: 'Score 3-4 points on the awareness quiz'
    },
    {
      id: 'quiz-expert',
      icon: '🌟',
      title: 'Prevention Expert',
      description: 'Score perfect 5/5 on the awareness quiz'
    }
  ];

  userProfile: UserProfile = {
    totalDonated: 0,
    familiesHelped: 0,
    donationCount: 0,
    shareCount: 0,
    achievements: []
  };

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    // In a real app, this would load from a service
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
    }
  }

  isUnlocked(achievementId: string): boolean {
    return this.userProfile.achievements.includes(achievementId);
  }

  getProgress(achievementId: string): number {
    if (this.isUnlocked(achievementId)) {
      return 100;
    }

    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement) return 0;

    switch (achievementId) {
      case 'first-donation':
        return this.userProfile.donationCount > 0 ? 100 : 0;

      case 'social-share':
        return this.userProfile.shareCount > 0 ? 100 : 0;

      case 'big-donor':
        return Math.min(100, (this.userProfile.totalDonated / (achievement.requirement || 500)) * 100);

      case 'consistent-supporter':
        return Math.min(100, (this.userProfile.donationCount / 3) * 100);

      default:
        return 0;
    }
  }

  scrollToDonation(): void {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  checkAchievement(achievementId: string): void {
    if (this.userProfile.achievements.includes(achievementId)) {
      return;
    }

    this.userProfile.achievements.push(achievementId);
    this.saveUserProfile();
    this.showAchievementToast(achievementId);
  }

  private saveUserProfile(): void {
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
  }

  private showAchievementToast(achievementId: string): void {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    // Create and show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${achievement.icon}</span>
        <div>
          <div class="font-semibold">Achievement Unlocked!</div>
          <div class="text-sm">${achievement.title}</div>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
