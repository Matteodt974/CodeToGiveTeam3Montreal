import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Cause {
  id: number;
  name: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  totalAmount: number = 100;
  causes: Cause[] = [];

  newCauseName: string = '';
  showAddCause: boolean = false;
  remainingPercentage: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.calculateRemaining();
  }

  onSliderChange(cause: Cause, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value);

    // Calculate the difference
    const difference = newValue - cause.percentage;

    // Update the current cause
    cause.percentage = newValue;

    // Distribute the difference among other causes proportionally
    if (this.causes.length > 1) {
      const otherCauses = this.causes.filter(c => c.id !== cause.id);
      const totalOtherPercentage = otherCauses.reduce((sum, c) => sum + c.percentage, 0);

      if (totalOtherPercentage > 0) {
        otherCauses.forEach(c => {
          const proportion = c.percentage / totalOtherPercentage;
          c.percentage = Math.round(Math.max(0, c.percentage - (difference * proportion)));
        });
      }
    }

    // Normalize to ensure total is 100%
    this.normalizePercentages();
    this.calculateRemaining();
  }

  normalizePercentages(): void {
    const total = this.causes.reduce((sum, c) => sum + c.percentage, 0);
    if (total !== 100 && total > 0) {
      const factor = 100 / total;
      this.causes.forEach(c => {
        c.percentage = Math.round(c.percentage * factor);
      });

      // Fix rounding errors
      const newTotal = this.causes.reduce((sum, c) => sum + c.percentage, 0);
      if (newTotal !== 100 && this.causes.length > 0) {
        this.causes[0].percentage += (100 - newTotal);
      }
    }
  }

  calculateRemaining(): void {
    const total = this.causes.reduce((sum, c) => sum + c.percentage, 0);
    this.remainingPercentage = 100 - total;
  }

  addCause(): void {
    if (this.newCauseName.trim()) {
      const colors = ['#BEA8DA', '#9886ae', '#6b588e', '#764ba2', '#4c4357'];
      const newCause: Cause = {
        id: Date.now(),
        name: this.newCauseName.trim(),
        percentage: 0,
        color: colors[this.causes.length % colors.length]
      };

      this.causes.push(newCause);
      this.newCauseName = '';
      this.showAddCause = false;

      // Redistribute percentages evenly
      this.redistributeEvenly();
    }
  }

  removeCause(causeId: number): void {
    if (this.causes.length > 1) {
      this.causes = this.causes.filter(c => c.id !== causeId);
      this.redistributeEvenly();
    }
  }

  redistributeEvenly(): void {
    const perCause = Math.floor(100 / this.causes.length);
    const remainder = 100 % this.causes.length;

    this.causes.forEach((cause, index) => {
      cause.percentage = perCause + (index < remainder ? 1 : 0);
    });

    this.calculateRemaining();
  }

  getCauseAmount(cause: Cause): number {
    return (this.totalAmount * cause.percentage) / 100;
  }

  getTotalDonation(): number {
    return this.totalAmount;
  }

  formatCurrency(amount: number): string {
    return amount.toFixed(2);
  }

  resetDistribution(): void {
    this.redistributeEvenly();
  }

  confirmDonation(): void {
    // TODO: Implement donation confirmation logic
    // This could include API call to backend, payment processing, etc.
    console.log('Donation confirmed:', {
      totalAmount: this.totalAmount,
      causes: this.causes.map(c => ({
        name: c.name,
        percentage: c.percentage,
        amount: this.getCauseAmount(c)
      }))
    });

    alert(`Merci pour votre don de ${this.formatCurrency(this.totalAmount)}$ !`);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
