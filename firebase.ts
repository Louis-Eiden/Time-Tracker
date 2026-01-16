// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  Auth,
} from "firebase/auth";
import Constants from "expo-constants";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore: getReactNativePersistence exists in the RN bundle
// but is often missing from public TypeScript definitions.
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error("Missing Firebase config");
}

// Prevent double initialization
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let auth: Auth;

// Web vs Native handling
if (Platform.OS === "web") {
  // WEB: choose desired persistence (usually local)
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
  // or:
  // auth.setPersistence(browserSessionPersistence);
} else {
  // REACT NATIVE: use AsyncStorage
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// Firestore
export const db = getFirestore(app);

export { app, auth };
