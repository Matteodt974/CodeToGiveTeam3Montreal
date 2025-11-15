// services/donation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private selectedAmountSubject = new BehaviorSubject<number>(100);
  selectedAmount$ = this.selectedAmountSubject.asObservable();

  private programAllocations = new BehaviorSubject({
    safety: 33,
    healing: 34,
    prevention: 33
  });
  programAllocations$ = this.programAllocations.asObservable();

  updateAmount(amount: number) {
    this.selectedAmountSubject.next(amount);
  }

  updateAllocations(allocations: any) {
    this.programAllocations.next(allocations);
  }
}
