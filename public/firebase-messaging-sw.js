// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyA9-n10rvyP68BokypkzONARIr9ohSfbh0",
//   authDomain: "arroseur2000.firebaseapp.com",
//   projectId: "arroseur2000",
//   storageBucket: "arroseur2000.appspot.com",
//   messagingSenderId: "905199392029",
//   appId: "1:905199392029:web:6ffbed226446d1e1b6fdf4",
// });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyA9-n10rvyP68BokypkzONARIr9ohSfbh0",
  authDomain: "arroseur2000.firebaseapp.com",
  projectId: "arroseur2000",
  storageBucket: "arroseur2000.appspot.com",
  messagingSenderId: "905199392029",
  appId: "1:905199392029:web:6ffbed226446d1e1b6fdf4",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
