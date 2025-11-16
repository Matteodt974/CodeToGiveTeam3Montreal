import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  private authHeaders(): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ 'X-API-KEY': environment.apiKey }) };
  }

  // Quiz
  getQuizQuestions(): Observable<any> {
    return this.http.get(`${this.base}/quiz/questions`);
  }
  // answers: { [questionId:number]: optionId:number }, email en query
  submitQuiz(email: string, answers: Record<number, number>): Observable<any> {
    return this.http.post(`${this.base}/quiz/submit?email=${encodeURIComponent(email)}`, answers, this.authHeaders());
  }

  // Events
  listEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/events`);
  }
  createEvent(event: any): Observable<any> {
    return this.http.post(`${this.base}/events`, event, this.authHeaders());
  }
  donateToEvent(id: number, donorName: string, email: string, amount: number): Observable<any> {
    const body = { donorName, email, amount };
    return this.http.post(`${this.base}/events/${id}/donate`, body, this.authHeaders());
  }

  // Subscriptions
  createSubscription(dto: any): Observable<any> {
    return this.http.post(`${this.base}/subscriptions`, dto, this.authHeaders());
  }
  cancelSubscription(email: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/subscriptions?email=${encodeURIComponent(email)}`, this.authHeaders());
  }
  getSubscription(email: string): Observable<any> {
    return this.http.get(`${this.base}/subscriptions?email=${encodeURIComponent(email)}`);
  }

  // Timeline (si nécessaire)
  getTimeline(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/timeline/${encodeURIComponent(userId)}`);
  }

  // Assistant (si activé)
  sendMessage(message: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(`${this.base}/assistant/message`, { message });
  }

  // Badges
  getAllBadges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/badges`);
  }

  getBadgeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/badges/${id}`);
  }

  getUserBadges(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/badges/user/${userId}`);
  }
}
