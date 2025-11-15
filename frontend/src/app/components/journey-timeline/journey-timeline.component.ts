import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-journey-timeline',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './journey-timeline.component.html',
  styleUrls: ['./journey-timeline.component.css']
})
export class JourneyTimelineComponent implements OnInit, OnDestroy {
  @Input() selectedAmount: number = 100;

  currentStep: number = -1;
  isAnimating: boolean = false;
  journeyPercentage: number = 0;

  private animationInterval?: number;

  readonly TOTAL_JOURNEY_COST = 1875;
  readonly TOTAL_STEPS = 6;
  readonly ANIMATION_STEP_DURATION = 2000; // 2 seconds per step

  ngOnInit(): void {
    this.calculateJourneyPercentage();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  calculateJourneyPercentage(): void {
    this.journeyPercentage = Math.min(
      Math.round((this.selectedAmount / this.TOTAL_JOURNEY_COST) * 100 * 10) / 10,
      100
    );
  }

  onPlayAnimation(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentStep = 0;

    this.animationInterval = window.setInterval(() => {
      if (this.currentStep < this.TOTAL_STEPS - 1) {
        this.currentStep++;
      } else {
        this.stopAnimation();
      }
    }, this.ANIMATION_STEP_DURATION);
  }

  onResetJourney(): void {
    this.stopAnimation();
    this.currentStep = -1;
  }

  private stopAnimation(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = undefined;
    }
    this.isAnimating = false;
  }
}
