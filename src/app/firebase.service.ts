import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { MessagePayload } from 'firebase/messaging';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private messaging = inject(Messaging);
  private platformId = inject(PLATFORM_ID); // Detect if running in the browser
  currentMessage = new BehaviorSubject<MessagePayload | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenForMessages();
    }
  }

  async requestPermission() {
    if (!isPlatformBrowser(this.platformId)) return; // Prevent execution on the server

    try {
      const token = await getToken(this.messaging, {
        vapidKey: `${environment.vapid_key}`,
      });
      if (token) {
        console.log('FCM Token:', token);
      } else {
        console.log('No registration token available.');
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
  }

  private listenForMessages() {
    onMessage(this.messaging, (payload: MessagePayload) => {
      console.log('Message received:', payload);
      this.currentMessage.next(payload);
    });
  }
}
