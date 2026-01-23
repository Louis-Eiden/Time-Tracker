import React, { useEffect } from "react";
import { useColorScheme, Platform, View, Text } from "react-native";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TimeProvider } from "./contexts/TimeContext";
import notifee, { EventType } from "@notifee/react-native";

// Screen Components
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "@/screens/HomeScreen";
import JobScreen from "@/screens/JobScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { RootStackParamList } from "./types";
import { AuthProvider } from "./contexts/AuthContext";

// Import Notification Helpers
import {
  backgroundNotificationHandler,
  setupNotificationChannel,
} from "./services/notifications.services";

// --- REGISTER BACKGROUND HANDLER ---
// This handles events when the app is killed or in background (e.g. pressing "Stop")
notifee.onBackgroundEvent(backgroundNotificationHandler);

// --- REGISTER FOREGROUND SERVICE (FIX FOR WARNING) ---
// This is required when displaying a notification with `asForegroundService: true`
notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    // We return a promise that never resolves to keep the service alive
    // until the timer is stopped (which cancels the notification).
  });
});

const Stack = createNativeStackNavigator<RootStackParamList>();

// Linking Options
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: Platform.OS === "web" ? ["#/"] : [],
  config: {
    screens: {
      Login: "login",
      Home: "home",
      Job: "job",
      Settings: "settings",
    },
  },
};

// ErrorBoundary
interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const theme = useColorScheme();

  // Setup Notification Channel on App Launch
  useEffect(() => {
    if (Platform.OS === "android") {
      setupNotificationChannel();

      // Optional: Handle foreground events (if app is open and user clicks Stop in notification tray)
      const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
        // Reuse the background logic since it does the same thing
        backgroundNotificationHandler({ type, detail });
      });
      return unsubscribe;
    }
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ThemeProvider>
            <TimeProvider>
              <PaperProvider>
                <NavigationContainer linking={linking}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Job" component={JobScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </PaperProvider>
            </TimeProvider>
          </ThemeProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
