import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface DonationEvent {
  id: number;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-donationevent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donationevent.component.html',
  styleUrls: ['./donationevent.component.css'],
})
export class DonationeventComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiBase = environment.apiBase;

  events: DonationEvent[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = null;

    this.http.get<DonationEvent[]>(`${this.apiBase}/events`).subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
        console.log('Active events loaded:', events);
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error = 'Unable to load events. Please try again.';
        this.loading = false;
      },
    });
  }

  navigateToDonation(event: DonationEvent): void {
    // Navigate to donation page with event info as query params
    this.router.navigate(['/donate'], {
      queryParams: {
        eventId: event.id,
        eventTitle: event.title,
      },
    });
  }

  getProgressPercentage(event: DonationEvent): number {
    if (event.goalAmount <= 0) return 0;
    const percentage = (event.currentAmount / event.goalAmount) * 100;
    return Math.min(percentage, 100);
  }

  getDaysRemaining(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}
