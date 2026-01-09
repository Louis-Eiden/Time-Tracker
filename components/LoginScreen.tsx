// LoginScreen.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { signUpUser, signInUser } from "@/services/users.service";
import type { NavigationProp } from "@/types";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createButtonStyles } from "@/theme/buttons";
import { createHomeStyles } from "@/theme/styles";
import LoginForm from "@/components/LoginForm";

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHomeStyles(colors);
  const buttonStyles = createButtonStyles(colors); // (not used here yet)

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
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Time Tracker</Text>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          style={styles.settingsIcon}
          rippleColor="transparent"
          containerColor="transparent"
          theme={{
            colors: {
              secondaryContainer: "transparent",
            },
          }}
          animated={false}
        />
      </View>

      <View style={styles.main}>
        <View style={[styles.jobList, { borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {isSignUp ? "Sign Up" : "Login"}
          </Text>

          {error ? (
            <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
          ) : null}

          <LoginForm
            loading={loading}
            initialIsSignUp={isSignUp}
            onSubmit={handleSubmit}
            onToggleMode={setIsSignUp}
          />
        </View>
      </View>
    </View>
  );
}
