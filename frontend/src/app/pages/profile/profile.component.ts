import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../../components/page/page.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';
import { JourneyTimelineComponent } from '../../components/journey-timeline/journey-timeline.component';
import { SocialShareComponent } from '../../components/socialshare/share.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageComponent,
    AchievementsComponent,
    LeaderboardComponent,
    JourneyTimelineComponent,
    SocialShareComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  // Données utilisateur exemple
  user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    totalDonations: 1250,
    donationCount: 15,
    currentStreak: 3,
  };
}
