import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1JHizDI-lhCl787BOpuq3U9DEjBHxaIs",
  authDomain: "bloomind-healthcare-22c1f.firebaseapp.com",
  projectId: "bloomind-healthcare-22c1f",
  storageBucket: "bloomind-healthcare-22c1f.firebasestorage.app",
  messagingSenderId: "730318779680",
  appId: "1:730318779680:web:af5383d8b7645e4b5cd345",
  measurementId: "G-SYVEPPLETD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase analytics not initialized:", (err as Error).message);
  }
}
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, firestore, analytics };
export default app;
