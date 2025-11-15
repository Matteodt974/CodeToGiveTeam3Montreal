import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  @Output() donateClick = new EventEmitter<void>();
  @Output() monthlyProtectorClick = new EventEmitter<void>();

  mainHeading: string = 'Stand with Survivors. Build Safety Across Generations.';
  heroSubtext: string = 'A single contribution can protect families today and break cycles of violence tomorrow. Family violence affects people of all ages, backgrounds, and cultures - but together, we can create lasting change.';

  constructor() {}

  ngOnInit(): void {
    // Component initialization logic
  }

  onDonateNow(): void {
    this.donateClick.emit();
    // Scroll to donation section or open donation modal
    this.scrollToSection('donation-section');
  }

  onBecomeMonthlyProtector(): void {
    this.monthlyProtectorClick.emit();
    // Scroll to monthly subscription section
    this.scrollToSection('monthly-subscription-section');
  }

  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
