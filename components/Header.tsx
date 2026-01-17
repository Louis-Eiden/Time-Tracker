import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOutUser } from "@/services/users.service";
import type { NavigationProp } from "@/types";

import { createHeaderStyles, createCommonStyles } from "@/theme/styles";
import { getThemeColors, useTheme } from "@/contexts/ThemeContext";

export default function Header({ jobName }: { jobName?: string }) {
  // Navigation
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  // Styles
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHeaderStyles(colors);
  const commonStyles = createCommonStyles(
    colors,
    theme,
    Platform.OS,
    route.name
  );
  // local
  const hideLeftIcon = route.name === "Login";
  const hideRightIcon = route.name === "Settings";

  return (
    <View style={styles.header}>
      {hideLeftIcon ? (
        // Invisible placeholder to preserve layout
        <View style={{ width: 52, height: 40 }} />
      ) : (
        <IconButton
          icon={route.name === "Home" ? "logout" : "arrow-left"}
          onPress={async () => {
            if (route.name === "Home") {
              await signOutUser();
              navigation.goBack();
            } else {
              navigation.goBack();
            }
          }}
          rippleColor="transparent"
          iconColor={colors.icon}
        />
      )}
      <Text style={commonStyles.title}>
        {route.name === "Settings"
          ? "Settings"
          : jobName
          ? jobName
          : "Time Tracker"}
      </Text>

      {hideRightIcon ? (
        // Invisible placeholder to preserve layout
        <View style={{ width: 52, height: 40 }} />
      ) : (
        <IconButton
          icon="cog"
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          rippleColor="transparent"
        />
      )}
    </View>
  );
}
