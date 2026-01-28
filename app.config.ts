import "dotenv/config";
import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Time-Tracker",
  slug: "Time-Tracker",
  version: "1.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,

  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "time.tracker",
    googleServicesFile: "./GoogleService-Info.plist",
  },

  android: {
    versionCode: 2,
    package: "com.louiseiden.timetracker",
    googleServicesFile: "./google-services.json",
    permissions: [
      "FOREGROUND_SERVICE",
      "WAKE_LOCK",
      // Android 14 requires specific types.
      // 'systemExempted' is often used by Notifee internally,
      // but for a timer, standard FOREGROUND_SERVICE is the base.
      // If you target Android 14+, you might need:
      // "FOREGROUND_SERVICE_SPECIAL_USE"
    ],
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    newArchEnabled: true,
  },

  web: {
    basePath: "/Time-Tracker",
    assetPrefix: "/Time-Tracker/",
    favicon: "./assets/favicon.png",
    config: {
      headTags: [
        {
          tag: "script",
          attributes: {
            src: "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
            defer: true,
            integrity:
              "sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==",
            crossorigin: "anonymous",
            referrerpolicy: "no-referrer",
          },
        },
      ],
    },
  },

  plugins: ["expo-build-properties"],

  updates: {
    enabled: false,
  },

  extra: {
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
};

export default config;
