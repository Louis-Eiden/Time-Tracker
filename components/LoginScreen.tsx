import React, { useState } from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";

import { signUpUser, signInUser } from "@/services/users.service";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@/types";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createButtonStyles } from "@/theme/buttons";
import { createHomeStyles } from "@/theme/styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHomeStyles(colors);
  const buttonStyles = createButtonStyles(colors);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          containerColor="transparent" // Background color of button
          theme={{
            colors: {
              secondaryContainer: "transparent", // Controls hover state background
            },
          }}
          animated={false}
        />
      </View>
      <View style={styles.main}>
        <View style={[styles.jobList, { borderColor: colors.border }]}>
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold mb-6 text-center"></h1>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4 p-2 border rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-6 p-2 border rounded"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
                </button>
              </form>

              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full mt-4 text-blue-600 hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </View>
      </View>
    </View>
  );
}
