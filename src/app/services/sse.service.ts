// sse.service.ts

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource: EventSource;
  private receivedDataSubject = new Subject<any>();

  constructor(private authService: AuthService) {}

  getUpdates(): Observable<any> {
    const token = AuthService.jwt;
    this.eventSource = new EventSource('https://merchant.tirgo.io/sse/events?token=' + token);

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.receivedDataSubject.next(data);
    };

    this.eventSource.onerror = (error) => {
      console.error('Error with SSE connection:', error);
    };

    return this.receivedDataSubject.asObservable();
  }

  closeConnection(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
