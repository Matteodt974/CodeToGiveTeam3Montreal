// services/user-profile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private profile = new BehaviorSubject({
    totalDonated: 0,
    familiesHelped: 0,
    donationCount: 0,
    shareCount: 0,
    achievements: []
  });

  profile$ = this.profile.asObservable();

  updateProfile(updates: Partial<any>) {
    const current = this.profile.value;
    this.profile.next({ ...current, ...updates });
  }
}
