import React, { useState } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Clock } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { signUpUser, signInUser } from "@/services/users.service";
import type { NavigationProp } from "@/types";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createLoginStyles, createCommonStyles } from "@/theme/styles";
import LoginForm from "@/components/LoginForm";
import { AnimatedScreenWrapper } from "@/components/AnimatedWrappers";

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = createLoginStyles(colors);
  const commonStyles = createCommonStyles(colors);

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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* 
        FIX: Use StyleSheet.flatten() because AnimatedScreenWrapper 
        expects a single ViewStyle object, not an array.
      */}
      <AnimatedScreenWrapper
        style={StyleSheet.flatten([
          commonStyles.retroCardWrapper,
          styles.loginCardWrapper,
        ])}
      >
        {/* 1. Shared Hard Shadow */}
        <View style={commonStyles.retroCardShadow} />

        {/* 2. Shared Main Card Surface + Login Specific Content Padding */}
        <View style={[commonStyles.retroCardMain, styles.loginCardContent]}>
          {/* --- FIXED LOGO WITH CROSS-PLATFORM SHADOW --- */}
          <View style={styles.logoWrapper}>
            {/* The Shadow Layer */}
            <View style={styles.logoShadow} />
            {/* The Main Box Layer */}
            <View style={styles.logoMain}>
              <Clock size={32} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </View>
          {/* ------------------------------------------- */}

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
      </AnimatedScreenWrapper>
    </SafeAreaView>
  );
}
