// Firebase configuration
const firebaseConfig = {
  // Web configuration
  web: {
    apiKey: "YOUR_WEB_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_WEB_APP_ID",
    // Include measurementId if you've set up Analytics
    measurementId: "YOUR_MEASUREMENT_ID",
  },
  // The native apps will use the config from google-services.json and GoogleService-Info.plist
  // These values are just for reference and type checking
  native: {
    apiKey: "YOUR_NATIVE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_NATIVE_APP_ID",
  },
};

export default firebaseConfig;
