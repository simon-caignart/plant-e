import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from "localforage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function PushNotificationLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await getFCMToken();
        if (token) {
          console.log("token", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url: string) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (message) => {
      toast(
        <div>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
          autoClose: 30000,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;

async function getFCMToken(): Promise<string | null> {
  try {
    // Initialize the Firebase app with the credentials
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyA9-n10rvyP68BokypkzONARIr9ohSfbh0",
      authDomain: "arroseur2000.firebaseapp.com",
      projectId: "arroseur2000",
      storageBucket: "arroseur2000.appspot.com",
      messagingSenderId: "905199392029",
      appId: "1:905199392029:web:6ffbed226446d1e1b6fdf4",
    });

    const messaging = getMessaging(firebaseApp);
    const tokenInLocalForage = await localforage.getItem("fcm_token");

    // Return the token if it is already in our local storage
    if (tokenInLocalForage !== null && typeof tokenInLocalForage === "string") {
      try {
        await fetch("/api/addFCMTokenToUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fcmToken: tokenInLocalForage,
          }),
        });
      } catch (error) {
        console.error(error);
      }

      return tokenInLocalForage;
    }

    // Request the push notification permission from browser
    const status = await Notification.requestPermission();
    if (status && status === "granted") {
      // Get new token from Firebase
      const fcm_token = await getToken(messaging, {
        vapidKey:
          "BH56p-h4Ro1MY6g4tUNyUDiv9gCLfgA2Or2s1-vAyqfsVWUFTIiOhyRYqmWMPHnhXYlcUW9HM1FbBl50ATXpADk",
      });

      // Set token in our local storage
      if (fcm_token) {
        localforage.setItem("fcm_token", fcm_token);

        try {
          await fetch("/api/addFCMTokenToUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fcmToken: fcm_token,
            }),
          });
        } catch (error) {
          console.error(error);
        }

        return fcm_token;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
