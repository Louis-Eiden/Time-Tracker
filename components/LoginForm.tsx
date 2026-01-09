// LoginForm.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

import { createLoginStyles } from "@/theme/styles";
import { createButtonStyles } from "@/theme/buttons";
import { getThemeColors, useTheme } from "@/contexts/ThemeContext";

interface LoginFormProps {
  loading?: boolean;
  initialIsSignUp?: boolean;
  onSubmit: (params: {
    email: string;
    password: string;
    isSignUp: boolean;
  }) => void;
  onToggleMode?: (isSignUp: boolean) => void;
}

export default function LoginForm({
  onSubmit,
  loading = false,
  initialIsSignUp = false,
  onToggleMode,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createLoginStyles(colors);
  const buttonStyles = createButtonStyles(colors);

  // Separate focus states for each input
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ email: email.trim(), password, isSignUp });
  };

  const handleToggleMode = () => {
    setIsSignUp((prev) => {
      const next = !prev;
      onToggleMode?.(next);
      return next;
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
        style={[styles.input, emailFocused && styles.inputFocused]}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        style={[styles.input, passwordFocused && styles.inputFocused]}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      <View style={buttonStyles.loginButton}>
        <Button
          title={loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>

      <View style={styles.toggleButton}>
        <Text onPress={handleToggleMode} style={styles.toggleText}>
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Text>
      </View>
    </View>
  );
}
