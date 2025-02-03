import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// Firebase modules
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),

    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Initialize Firebase Messaging
    provideMessaging(() => getMessaging()),

    // Register the service worker for Firebase messaging
    provideServiceWorker('firebase-messaging-sw.js'),
  ],
};
