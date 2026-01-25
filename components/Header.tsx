import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft, LogOut, Settings } from "lucide-react-native";
import { signOutUser } from "@/services/users.service";
import type { NavigationProp } from "@/types";

import { createHeaderStyles } from "@/theme/styles";
import { getThemeColors, useTheme } from "@/contexts/ThemeContext";

export default function Header({ jobName }: { jobName?: string }) {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHeaderStyles(colors);

  const hideLeftIcon = route.name === "Login";
  const hideRightIcon = route.name === "Settings";

  const handleLeftPress = async () => {
    if (route.name === "Home") {
      await signOutUser();
      navigation.goBack(); // Or navigate to Login
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleGroup}>
        {!hideLeftIcon && (
          <TouchableOpacity onPress={handleLeftPress} style={styles.iconButton}>
            {route.name === "Home" ? (
              <LogOut size={24} color={colors.icon} />
            ) : (
              <ArrowLeft size={24} color={colors.icon} />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle} numberOfLines={1}>
          {route.name === "Settings"
            ? "Settings"
            : jobName
              ? jobName
              : "Time Tracker"}
        </Text>
      </View>

      {!hideRightIcon && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={styles.iconButton}
        >
          <Settings size={24} color={colors.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}
