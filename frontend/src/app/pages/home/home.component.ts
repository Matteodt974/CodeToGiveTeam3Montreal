// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImpactTrackerComponent} from '../../components/impact-tracker/impact-tracker.component';
import {DonationFormComponent} from '../../components/donation-form/donation-form.component';
import {AchievementsComponent} from '../../components/achievements/achievements.component';
import {AiChatComponent} from '../../components/ai-chat/ai-chat.component';
import {QuizComponent} from '../../components/quiz/quiz.component';
import {JourneyTimelineComponent} from '../../components/journey-timeline/journey-timeline.component';
import {LeaderboardComponent} from '../../components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ImpactTrackerComponent,
    DonationFormComponent,
    AchievementsComponent,
    AiChatComponent,
    QuizComponent,
    JourneyTimelineComponent,
    LeaderboardComponent
  ],
  template: `
    <app-impact-tracker></app-impact-tracker>
    <app-quiz></app-quiz>
    <app-donation-form id="donation-section"></app-donation-form>
    <app-journey-timeline></app-journey-timeline>
    <app-leaderboard></app-leaderboard>
    <app-achievements></app-achievements>
    <app-ai-chat *ngIf="showChat"></app-ai-chat>
  `
})
export class HomeComponent {
  showChat = false;
}
