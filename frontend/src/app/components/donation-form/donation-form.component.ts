import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  presetAmounts = [25, 50, 100, 250];
  selectedAmount = 0;
  customAmount: number | null = null;
  isRecurring = false;
  isProcessing = false;
  donorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.donorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      anonymous: [false],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Pre-select default amount
    this.selectAmount(100);
  }

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  onCustomAmountChange(): void {
    if (this.customAmount && this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
    }
  }

  toggleRecurring(): void {
    this.isRecurring = !this.isRecurring;
  }

  getImpactText(amount: number): string {
    if (amount >= 250) return '5 shelter nights';
    if (amount >= 100) return '3 shelter nights';
    if (amount >= 50) return '1 shelter night';
    return '1 therapy session';
  }

  getDetailedImpact(): string {
    const amount = this.selectedAmount;
    const impacts = [];

    const shelterNights = Math.floor(amount / 35);
    if (shelterNights > 0) {
      impacts.push(`provide ${shelterNights} emergency shelter night${shelterNights > 1 ? 's' : ''}`);
    }

    const therapySessions = Math.floor(amount / 25);
    if (therapySessions > 0 && impacts.length === 0) {
      impacts.push(`provide ${therapySessions} therapy session${therapySessions > 1 ? 's' : ''} for children`);
    }

    if (amount >= 50) {
      impacts.push('support prevention workshops');
    }

    return impacts.join(', ') || 'support families in need';
  }

  async submitDonation(): Promise<void> {
    if (!this.donorForm.valid || this.selectedAmount === 0) {
      return;
    }

    this.isProcessing = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const donationData = {
      ...this.donorForm.value,
      amount: this.selectedAmount,
      isRecurring: this.isRecurring,
      timestamp: new Date().toISOString()
    };

    console.log('Donation submitted:', donationData);

    // Reset form and show success
    this.isProcessing = false;
    alert(`Thank you for your ${this.isRecurring ? 'monthly ' : ''}donation of $${this.selectedAmount}!`);

    // Reset form
    this.donorForm.reset();
    this.selectedAmount = 100;
    this.isRecurring = false;
  }
}
