import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Play } from "lucide-react-native";

import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { createListItemStyles } from "../theme/styles";

interface ListItemProps {
  text: string;
  subText?: string;
  id?: string; // e.g. "001"
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
  subText,
  id,
  onPress,
  rightSwipeActions,
  leftSwipeActions,
}: ListItemProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createListItemStyles(colors, Platform.OS);
  const swipeRef = useRef<Swipeable>(null);

  const confirmDelete = (onConfirm: () => void) => {
    if (Platform.OS === "web") {
      if (window.confirm("Delete this item?")) onConfirm();
      return;
    }
    Alert.alert("Delete item", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onConfirm },
    ]);
  };

  const renderRightActions = () => {
    if (!rightSwipeActions) return null;
    return (
      <TouchableOpacity
        style={styles.rightSwipeActions}
        onPress={() => confirmDelete(rightSwipeActions.onPress)}
      >
        <Text style={styles.swipeText}>{rightSwipeActions.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = () => {
    if (!leftSwipeActions) return null;
    return (
      <TouchableOpacity
        style={styles.leftSwipeActions}
        onPress={() => {
          swipeRef.current?.close();
          leftSwipeActions.onPress();
        }}
      >
        <Text style={styles.swipeText}>{leftSwipeActions.label}</Text>
      </TouchableOpacity>
    );
  };

  // Generate a random progress bar width based on text length for visual flair
  // const progressWidth = `${(text.length * 7) % 100}%`;

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <View style={styles.container}>
        {id && (
          <View style={styles.idTag}>
            <Text style={styles.idTagText}>#{id.substring(0, 4)}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.touchable}
        >
          <View style={styles.headerRow}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {text}
              </Text>
              {subText && <Text style={styles.itemSubtitle}>{subText}</Text>}
            </View>
            <View style={styles.iconBox}>
              <Play size={14} color="#000000" fill="#000000" />
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: "100%" }]} />
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}
