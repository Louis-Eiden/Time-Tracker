import Constants from "expo-constants";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error("Missing Firebase config");
}

// Prevent double initialization
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Expo-compatible Auth (NO persistence config)
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

export default app;
