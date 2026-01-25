import React, { useState } from "react";
import { Platform, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Clock } from "lucide-react-native";

import { signUpUser, signInUser } from "@/services/users.service";
import type { NavigationProp } from "@/types";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createLoginStyles } from "@/theme/styles";
import LoginForm from "@/components/LoginForm";

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createLoginStyles(colors, theme, Platform.OS, "Login");

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
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoBox}>
          <Clock size={32} color="#FFFFFF" strokeWidth={2.5} />
        </View>
        <Text style={styles.title}>Time Tracker</Text>
        <Text style={styles.subtitle}>v1.0.4 RETRO_BUILD</Text>

        <LoginForm
          loading={loading}
          isSignUp={isSignUp}
          onSubmit={handleSubmit}
          onToggleMode={setIsSignUp}
        />
        {error ? (
          <Text style={{ color: colors.danger, marginTop: 16 }}>{error}</Text>
        ) : null}
      </View>
    </View>
  );
}
