// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { ImpactTrackerComponent } from './components/impact-tracker/impact-tracker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { JourneyTimelineComponent } from './components/journey-timeline/journey-timeline.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    DonationFormComponent,
    ImpactTrackerComponent,
    QuizComponent,
    AchievementsComponent,
    JourneyTimelineComponent,
    LeaderboardComponent,
    AiChatComponent,
    RouterOutlet,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shield-of-athena';
}
