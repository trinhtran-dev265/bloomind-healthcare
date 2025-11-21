import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

if (!firebaseConfig.apiKey) {
  console.error("❌ Firebase config missing! Check app.json extra fields.");
  throw new Error(
    "Firebase configuration is missing. Please check your app.json file."
  );
}

console.log("✅ Firebase config loaded successfully");

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
