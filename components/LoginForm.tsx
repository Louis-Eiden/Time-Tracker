import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

import { createLoginStyles } from "@/theme/styles";
import { getThemeColors, useTheme } from "@/contexts/ThemeContext";

interface LoginFormProps {
  loading?: boolean;
  isSignUp: boolean;
  onSubmit: (params: {
    email: string;
    password: string;
    isSignUp: boolean;
  }) => void;
  onToggleMode: (isSignUp: boolean) => void;
}

export default function LoginForm({
  onSubmit,
  loading = false,
  isSignUp,
  onToggleMode,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createLoginStyles(colors, theme, Platform.OS, "Login");

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ email: email.trim(), password, isSignUp });
  };

  return (
    <>
      <View style={styles.inputGroup}>
        <Text
          style={{ ...styles.subtitle, marginBottom: 6, fontWeight: "bold" }}
        >
          IDENTITY
        </Text>
        <TextInput
          placeholder="user@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text
          style={{ ...styles.subtitle, marginBottom: 6, fontWeight: "bold" }}
        >
          PASSCODE
        </Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading
            ? "PROCESSING..."
            : isSignUp
              ? "CREATE ACCOUNT"
              : "ACCESS SYSTEM"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onToggleMode(!isSignUp)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          {isSignUp ? "Already have an account? Login" : "Create new account"}
        </Text>
      </TouchableOpacity>
    </>
  );
}
