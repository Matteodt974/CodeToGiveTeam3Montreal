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
        color: 'text-blue-600'
      },
      {
        label: 'Emergency Shelter Nights',
        value: 15000,
        suffix: '+',
        color: 'text-blue-600'
      },
      {
        label: 'Therapy Sessions Provided',
        value: 8000,
        suffix: '+',
        color: 'text-blue-600'
      },
      {
        label: 'Prevention Workshops',
        value: 200,
        suffix: '+',
        color: 'text-blue-600'
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
      this.animatedStats = this.impactStats.map(stat => ({
        ...stat,
        value: 0
      }));

      const duration = 2000;
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

    getIconPath(index: number): string {
      const icons = [
        // Users/Family icon
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        // Home icon
        'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        // Chat/Message icon
        'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        // Book/Education icon
        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
      ];
      return icons[index] || icons[0];
    }

    getDescription(index: number): string {
      const descriptions = [
        'Every year, we provide comprehensive support to thousands of families seeking safety and healing.',
        'Safe shelter nights provided annually, offering refuge and security to those in need.',
        'Professional therapy sessions helping individuals and families rebuild their lives with dignity.',
        'Community prevention workshops educating and empowering communities to break cycles of violence.'
      ];
      return descriptions[index] || '';
    }
  }
