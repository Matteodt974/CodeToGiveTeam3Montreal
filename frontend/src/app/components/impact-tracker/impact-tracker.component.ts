import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface ImpactStat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

@Component({
  selector: 'app-impact-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-tracker.component.html',
  styleUrls: ['./impact-tracker.component.css']
})
export class ImpactTrackerComponent implements OnInit, OnDestroy {
  impactStats: ImpactStat[] = [
    {
      label: 'Families Served Annually',
      value: 2500,
      suffix: '+',
      color: 'text-red-600'
    },
    {
      label: 'Emergency Shelter Nights',
      value: 15000,
      suffix: '+',
      color: 'text-red-600'
    },
    {
      label: 'Therapy Sessions Provided',
      value: 8000,
      suffix: '+',
      color: 'text-red-600'
    },
    {
      label: 'Prevention Workshops',
      value: 200,
      suffix: '+',
      color: 'text-red-600'
    }
  ];

  animatedStats: { label: string; value: number; suffix: string; color: string; }[] = [];
  private animationSubscription?: Subscription;

  ngOnInit(): void {
    this.animateStats();
  }

  ngOnDestroy(): void {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }

  private animateStats(): void {
    // Initialize with zeros
    this.animatedStats = this.impactStats.map(stat => ({
      ...stat,
      value: 0
    }));

    // Animate each stat to its target value
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval_time = duration / steps;

    this.animationSubscription = interval(interval_time).subscribe((step) => {
      if (step >= steps) {
        this.animatedStats = [...this.impactStats];
        this.animationSubscription?.unsubscribe();
        return;
      }

      this.animatedStats = this.impactStats.map(stat => ({
        ...stat,
        value: Math.floor((stat.value / steps) * (step + 1))
      }));
    });
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }
}
