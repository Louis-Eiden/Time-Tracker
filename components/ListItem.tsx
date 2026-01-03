import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Text, Button, IconButton, Menu } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";
import { isMobileOrTablet } from "../utils/platform";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { createListItemStyles } from "../theme/styles";

interface ListItemProps {
  text: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  menuItems?: Array<{
    title: string;
    onPress: () => void;
  }>;
  rightSwipeActions?: {
    label: string;
    color: string;
    onPress: () => void;
  };
  leftSwipeActions?: {
    label: string;
    color: string;
    onPress: () => void;
  };
}

export default function ListItem({
  text,
  onPress,
  onEdit,
  onDelete,
  menuItems = [],
  rightSwipeActions,
  leftSwipeActions,
}: ListItemProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createListItemStyles(colors);

  // Default menu items if onEdit and onDelete are provided
  const defaultMenuItems = [];
  if (onEdit) {
    defaultMenuItems.push({
      title: "Edit",
      onPress: () => {
        onEdit();
        setMenuVisible(false);
      },
    });
  }
  if (onDelete) {
    defaultMenuItems.push({
      title: "Delete",
      onPress: () => {
        onDelete();
        setMenuVisible(false);
      },
    });
  }

  // Combine default and custom menu items
  const allMenuItems = [...defaultMenuItems, ...menuItems];

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    if (!rightSwipeActions) return null;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: rightSwipeActions.color,
          justifyContent: "center",
          alignItems: "center",
          width: 70,
        }}
        onPress={rightSwipeActions.onPress}
      >
        <Text style={{ color: "white" }}>{rightSwipeActions.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    if (!leftSwipeActions) return null;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: leftSwipeActions.color,
          justifyContent: "center",
          alignItems: "center",
          width: 70,
        }}
        onPress={leftSwipeActions.onPress}
      >
        <Text style={{ color: "white" }}>{leftSwipeActions.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <Button
        mode="outlined"
        onPress={onPress}
        style={styles.container}
        theme={{ colors: { outline: colors.border } }}
        rippleColor="transparent"
      >
        <View style={styles.content}>
          <Text style={styles.text}>{text}</Text>
          {/* {!isMobileOrTablet() && allMenuItems.length > 0 && (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  iconColor={colors.icon}
                  style={styles.contextMenuButton}
                  rippleColor="transparent"
                  containerColor="transparent"
                  theme={{
                    colors: {
                      secondaryContainer: "transparent",
                    },
                  }}
                  onPress={(e) => {
                    e.stopPropagation();
                    setMenuVisible(true);
                  }}
                />
              }
            >
              {allMenuItems.map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={item.onPress}
                  title={item.title}
                />
              ))}
            </Menu>
          )} */}
        </View>
      </Button>
    </Swipeable>
  );
}
