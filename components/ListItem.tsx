import React, { useRef, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Play } from "lucide-react-native";

import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { createListItemStyles } from "../theme/styles";

interface ListItemProps {
  text: string;
  subText?: string;
  id?: string;
  onPress?: () => void;
  rightSwipeActions?: { label: string; onPress: () => void };
  leftSwipeActions?: { label: string; onPress: () => void };
  index?: number;
}

export default function ListItem({
  text,
  subText,
  id,
  onPress,
  rightSwipeActions,
  leftSwipeActions,
  index = 0,
}: ListItemProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createListItemStyles(colors, Platform.OS);
  const swipeRef = useRef<Swipeable>(null);

  // --- STATE TO TRACK SWIPING ---
  const [isSwiping, setIsSwiping] = useState(false);

  // --- ANIMATION LOGIC ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 15,
        stiffness: 100,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

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

  const handlePress = () => {
    // Prevent press if swiping is active
    if (isSwiping) return;
    onPress?.();
  };

  return (
    <Animated.View
      style={[
        styles.swipeWrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Swipeable
        ref={swipeRef}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        // Track swipe state to prevent accidental presses
        onSwipeableWillOpen={() => setIsSwiping(true)}
        onSwipeableWillClose={() => setIsSwiping(false)}
      >
        <View style={styles.container}>
          {/* {id && (
            <View style={styles.idTag}>
              <Text style={styles.idTagText}>#{id.substring(0, 4)}</Text>
            </View>
          )} */}

          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={styles.touchable}
            // Disable touch events on the button itself while swiping
            disabled={isSwiping}
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
    </Animated.View>
  );
}
