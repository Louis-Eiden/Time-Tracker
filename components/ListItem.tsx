import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";

import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { createCommonStyles, createListItemStyles } from "../theme/styles";

interface ListItemProps {
  text: string;
  onPress?: () => void;
  rightSwipeActions?: {
    label: string;
    onPress: () => void;
  };
  leftSwipeActions?: {
    label: string;
    onPress: () => void;
  };
}

export default function ListItem({
  text,
  onPress,
  rightSwipeActions,
  leftSwipeActions,
}: ListItemProps) {
  // Styles
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createListItemStyles(colors, Platform.OS);
  const commonStyles = createCommonStyles(colors, theme, Platform.OS, "Job");

  const [isSwiping, setIsSwiping] = useState(false);
  const swipeRef = useRef<Swipeable>(null);

  // Delete Confirmation
  const confirmDelete = (onConfirm: () => void) => {
    // WEB: use native browser confirm
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?\nThis action cannot be undone.",
      );
      if (confirmed) {
        onConfirm();
      }
      return;
    }

    // NATIVE: use Alert.alert
    Alert.alert(
      "Delete item",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onConfirm },
      ],
      { cancelable: true },
    );
  };

  // Right swipe actions renderer (Delete)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    if (!rightSwipeActions) return null;

    return (
      <TouchableOpacity
        style={styles.rightSwipeActions}
        onPress={() => confirmDelete(rightSwipeActions.onPress)}
      >
        <Text style={styles.touchableText}>{rightSwipeActions.label}</Text>
      </TouchableOpacity>
    );
  };

  // Left swipe actions renderer (Edit)
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    if (!leftSwipeActions) return null;

    return (
      <TouchableOpacity
        style={styles.leftSwipeActions}
        onPress={() => {
          swipeRef.current?.close();
          leftSwipeActions.onPress();
        }}
      >
        <Text style={styles.touchableText}>{leftSwipeActions.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableWillOpen={() => setIsSwiping(true)}
      onSwipeableClose={() => {
        // small delay to avoid click firing right after swipe
        setTimeout(() => setIsSwiping(false), 50);
      }}
    >
      <TouchableRipple
        onPress={() => {
          if (isSwiping) return;
          onPress?.();
        }}
        // We manually add the border styles here because TouchableRipple
        // doesn't have a 'mode="outlined"' prop like Button does.
        style={styles.container}
        rippleColor={colors.buttons} // Slight primary color ripple
      >
        <View style={styles.content}>
          <Text
            style={commonStyles.text}
            numberOfLines={0} // 0 means "unlimited lines" (allows wrapping)
          >
            {text}
          </Text>
        </View>
      </TouchableRipple>
    </Swipeable>
  );
}
