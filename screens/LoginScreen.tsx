// LoginScreen.tsx
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { signUpUser, signInUser } from "@/services/users.service";
import type { NavigationProp } from "@/types";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createCommonStyles, createLoginStyles } from "@/theme/styles";
import LoginForm from "@/components/LoginForm";
import Header from "../components/Header";

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createLoginStyles(colors, theme, Platform.OS, "Login");
  const commonStyles = createCommonStyles(colors, theme, Platform.OS, "Login");

  const handleSubmit = async (params: {
    email: string;
    password: string;
    isSignUp: boolean;
  }) => {
    const { email, password, isSignUp } = params;
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUpUser(email, password);
      } else {
        await signInUser(email, password);
      }
      navigation.navigate("Home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Header />
      {/* ===================================================================== */}
      {/* Placeholder for Timer */}
      {/* ===================================================================== */}
      {Platform.OS === "web" ? <View style={{ height: 105 }} /> : ""}

      {/* ===================================================================== */}
      {/* Placeholder Start / Stop Button */}
      {/* ===================================================================== */}
      {Platform.OS === "web" ? <View style={{ height: 130 }} /> : ""}

      <View style={commonStyles.main}>
        <View style={styles.loginListContainer}>
          <LoginForm
            loading={loading}
            initialIsSignUp={isSignUp}
            onSubmit={handleSubmit}
            onToggleMode={setIsSignUp}
          />
          {error ? (
            <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
