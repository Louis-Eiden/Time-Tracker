import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { createHeaderStyles } from "@/theme/styles";
import { getThemeColors, useTheme } from "@/contexts/ThemeContext";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NavigationProp } from "@/types";
import { signOutUser } from "@/services/users.service";

export default function Header({ jobName }: { jobName?: string }) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHeaderStyles(colors);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const heading =
    route.name === "Settings" ? "Settings" : jobName ? jobName : "Time Tracker";

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
          // containerColor="transparent"
          // theme={{
          //   colors: {
          //     secondaryContainer: "transparent",
          //   },
          // }}
        />
      )}
      <Text style={styles.title}>{heading}</Text>

      {hideRightIcon ? (
        // Invisible placeholder to preserve layout
        <View style={{ width: 52, height: 40 }} />
      ) : (
        <IconButton
          icon="cog"
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          // style={styles.headerIcons}
          rippleColor="transparent"
          // containerColor="transparent" // Background color of button
          // theme={{
          //   colors: {
          //     secondaryContainer: "transparent", // Controls hover state background
          //   },
          // }}
        />
      )}
    </View>
  );
}
