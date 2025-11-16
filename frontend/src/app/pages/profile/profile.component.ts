import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../../components/page/page.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';
import { JourneyTimelineComponent } from '../../components/journey-timeline/journey-timeline.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageComponent,
    AchievementsComponent,
    LeaderboardComponent,
    JourneyTimelineComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Données utilisateur exemple
  user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    memberSince: 'Janvier 2024',
    totalDonations: 1250,
    donationCount: 15,
    currentStreak: 3,
    level: 'Gold Donor'
  };
}
