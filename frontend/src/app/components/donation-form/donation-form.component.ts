import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface CreateTransactionRequest {
  donorName: string;
  email: string;
  amount: number;
  anonymous: boolean;
}

interface TransactionResponse {
  id: number;
  donorName: string;
  email: string;
  amount: number;
  anonymous: boolean;
  createdAt: string;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgForOf, NgIf],
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private apiBase = environment.apiBase;

  presetAmounts = [25, 50, 100, 250];
  selectedAmount = 0;
  customAmount: number | null = null;
  isRecurring = false;
  isProcessing = false;
  donorForm: FormGroup;

  // Event-specific donation
  eventId: number | null = null;
  eventTitle: string | null = null;
  isEventDonation = false;

  constructor(private fb: FormBuilder) {
    this.donorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      anonymous: [false],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectAmount(100);

    // Check for event parameters
    this.route.queryParams.subscribe((params) => {
      if (params['eventId'] && params['eventTitle']) {
        this.eventId = +params['eventId'];
        this.eventTitle = params['eventTitle'];
        this.isEventDonation = true;
        console.log(
          'Event donation mode:',
          this.eventId,
          this.eventTitle
        );
      }
    });
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
      impacts.push(
        `provide ${shelterNights} emergency shelter night${
          shelterNights > 1 ? 's' : ''
        }`
      );
    }

    const therapySessions = Math.floor(amount / 25);
    if (therapySessions > 0 && impacts.length === 0) {
      impacts.push(
        `provide ${therapySessions} therapy session${
          therapySessions > 1 ? 's' : ''
        } for children`
      );
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': environment.apiKey,
    });

    if (this.isEventDonation && this.eventId) {
      // Event-specific donation
      this.processEventDonation(headers);
    } else {
      // Regular donation
      this.processRegularDonation(headers);
    }
  }

  private processRegularDonation(headers: HttpHeaders): void {
    const transactionRequest: CreateTransactionRequest = {
      donorName: 'george',
      email: 'george@test.com',
      amount: this.selectedAmount,
      anonymous: this.donorForm.value.anonymous || false,
    };

    this.http
      .post<TransactionResponse>(
        `${this.apiBase}/transactions`,
        transactionRequest,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Transaction created:', response);
          this.isProcessing = false;
          alert(
            `Thank you for your ${
              this.isRecurring ? 'monthly ' : ''
            }donation of $${this.selectedAmount}! Transaction ID: ${
              response.id
            }`
          );

          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating transaction:', err);
          this.isProcessing = false;
          alert(
            'An error occurred while processing your donation. Please try again.'
          );
        },
      });
  }

  private processEventDonation(headers: HttpHeaders): void {
    const donorEmail = 'george@test.com';

    // Step 1: Create donation for the event
    this.http
      .post<any>(
        `${this.apiBase}/events/${this.eventId}/donate`,
        {
          email: donorEmail,
          amount: this.selectedAmount,
        },
        { headers }
      )
      .pipe(
        // Step 2: Create badge for the event (if it doesn't exist)
        switchMap((transactionResponse) => {
          console.log('Event transaction created:', transactionResponse);

          const badgeData = {
            id: null,
            name: this.eventTitle,
            description: `Participated in ${this.eventTitle} event`,
            icon: '🎯',
          };

          return this.http
            .post<Badge>(`${this.apiBase}/badges`, badgeData, { headers })
            .pipe(
              catchError((err) => {
                console.log('Badge creation response:', err);
                // Badge might already exist, fetch all badges to find it
                return this.http.get<Badge[]>(`${this.apiBase}/badges`).pipe(
                  switchMap((badges) => {
                    const existingBadge = badges.find(
                      (b) => b.name === this.eventTitle
                    );
                    if (existingBadge) {
                      return of(existingBadge);
                    }
                    throw new Error('Badge not found');
                  })
                );
              })
            );
        }),
        // Step 3: Assign badge to user
        switchMap((badge: Badge) => {
          console.log('Badge created/found:', badge);

          // Get user ID - for now use default user ID 1
          const userId = 1; // TODO: Get from auth service

          console.log('Assigning badge', badge.id, 'to user', userId);

          return this.http.post<Badge[]>(
            `${this.apiBase}/badges/user/${userId}/assign`,
            [badge.id],
            { headers }
          );
        })
      )
      .subscribe({
        next: (result) => {
          console.log('Event donation process completed:', result);
          this.isProcessing = false;

          this.showSuccessToast();

          alert(
            `Thank you for your donation of $${this.selectedAmount} to ${this.eventTitle}! You've earned a new badge!`
          );

          this.resetForm();
        },
        error: (err) => {
          console.error('Event donation process error:', err);
          this.isProcessing = false;
          alert(
            'An error occurred while processing your donation. Please try again.'
          );
        },
      });
  }

  private showSuccessToast(): void {
    const toast = document.createElement('div');
    toast.className =
      'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">🎉</span>
        <div>
          <div class="font-semibold">Thank you for your donation!</div>
          <div class="text-sm">You've earned a new badge!</div>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  private resetForm(): void {
    this.donorForm.reset();
    this.selectedAmount = 100;
    this.isRecurring = false;
  }
}
