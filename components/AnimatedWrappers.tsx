import React, { useEffect, useRef } from "react";
import {
  Animated,
  ViewStyle,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

// --- 1. Screen Transition Wrapper ---
// Fades in and slides up when a screen loads
export const AnimatedScreenWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 20,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

// --- 2. Retro Press Button ---
// Simulates the physical button press (moving down/right)
interface RetroButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const RetroAnimatedButton = ({
  children,
  onPress,
  style,
  disabled,
}: RetroButtonProps) => {
  const pressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      speed: 50,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      speed: 50,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });
  const translateX = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });
  const shadowOpacity = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  }); // Hide shadow visually when pressed

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ translateX }, { translateY }],
            // We reduce shadow opacity to simulate the button touching the "ground"
            shadowOpacity: shadowOpacity,
            elevation: shadowOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [4, 0],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
