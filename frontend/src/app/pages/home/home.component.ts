import {Component, OnInit, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ImpactTrackerComponent} from '../../components/impact-tracker/impact-tracker.component';
import {QuizComponent} from '../../components/quiz/quiz.component';
import {JourneyTimelineComponent} from '../../components/journey-timeline/journey-timeline.component';
import {LeaderboardComponent} from '../../components/leaderboard/leaderboard.component';
import {PageComponent} from '../../components/page/page.component';
import {DonationeventComponent} from '../../components/donationevent/donationevent.component';
import { SocialShareComponent } from '../../components/socialshare/share.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    ImpactTrackerComponent,
    QuizComponent,
    JourneyTimelineComponent,
    LeaderboardComponent,
    DonationeventComponent,
    SocialShareComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private router = inject(Router);

  config?: any;
  showChat: boolean = true;

  ngOnInit(): void {
    this.config = {
      impact_counter_title: 'Our Impact'
    };
  }

  onDonateClick(): void {
    this.router.navigate(['/donate']);
  }
}
