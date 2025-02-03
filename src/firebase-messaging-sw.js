// Import Firebase scripts (for service workers)
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize Firebase in Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyA5zkEmDqFS8YG7ihZjO0GOjN3xFKf1hmg",
    authDomain: "angular-push-notificatio-6a536.firebaseapp.com",
    projectId: "angular-push-notificatio-6a536",
    storageBucket: "angular-push-notificatio-6a536.firebasestorage.app",
    messagingSenderId: "339433773489",
    appId: "1:339433773489:web:e8951f1e6035dda3a74590",
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
