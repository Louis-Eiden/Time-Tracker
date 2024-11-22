import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { View, Text } from "react-native";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomeScreen from "./components/HomeScreen";
import JobScreen from "./components/JobScreen";
import SettingsScreen from "./components/SettingsScreen";
import { colors } from "./theme/colors";

type RootStackParamList = {
  Home: undefined;
  Job: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    // Log to your preferred error tracking service here
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
  const [isReady, setIsReady] = useState(false);
  const theme = useColorScheme();

  useEffect(() => {
    console.log("App mounting...");
    try {
      setIsReady(true);
      console.log("App ready");
    } catch (error) {
      console.error("Error during app initialization:", error);
    }
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PaperProvider>
          <NavigationContainer
            theme={{
              dark: theme === "dark",
              colors: {
                primary: colors.primary,
                background: colors.background,
                card: colors.background,
                text: colors.text,
                border: colors.border,
                notification: colors.primary,
              },
            }}
            fallback={<Text style={{ color: colors.text }}>Loading...</Text>}
          >
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Job" component={JobScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
