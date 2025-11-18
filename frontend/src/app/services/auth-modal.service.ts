import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  private showAuthChoiceModal = new BehaviorSubject<boolean>(false);
  showAuthChoiceModal$ = this.showAuthChoiceModal.asObservable();

  // Store event info for after auth
  private pendingEventId: number | null = null;
  private pendingEventTitle: string | null = null;

  openAuthChoiceModal(eventId?: number, eventTitle?: string): void {
    if (eventId && eventTitle) {
      this.pendingEventId = eventId;
      this.pendingEventTitle = eventTitle;
    }
    this.showAuthChoiceModal.next(true);
  }

  closeAuthChoiceModal(): void {
    this.showAuthChoiceModal.next(false);
  }

  getPendingEventInfo(): { eventId: number | null; eventTitle: string | null } {
    return {
      eventId: this.pendingEventId,
      eventTitle: this.pendingEventTitle,
    };
  }

  clearPendingEventInfo(): void {
    this.pendingEventId = null;
    this.pendingEventTitle = null;
  }
}
