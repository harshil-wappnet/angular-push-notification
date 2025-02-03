// Import Firebase scripts (for service workers)
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize Firebase in Service Worker
firebase.initializeApp({
    apiKey: 'Your-Production-API-Key',
    authDomain: 'your-prod-auth-domain.firebaseapp.com',
    projectId: 'your-prod-project-id',
    storageBucket: 'your-prod-storage-bucket.appspot.com',
    messagingSenderId: 'your-prod-messaging-sender-id',
    appId: 'your-prod-app-id',
    measurementId: 'your-prod-measurement-id',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon || '/assets/icons/notification-icon.png',
    });
});
