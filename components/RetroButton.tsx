import React, { useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface RetroButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
  shadowColor?: string;
  shadowOffset?: number;
}

export default function RetroButton({
  onPress,
  style,
  children,
  disabled,
  shadowColor = "#000000",
  shadowOffset = 4,
}: RetroButtonProps) {
  const pressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(pressAnim, {
      toValue: 1,
      speed: 50,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(pressAnim, {
      toValue: 0,
      speed: 50,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const translate = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, shadowOffset],
  });

  const flatStyle = StyleSheet.flatten(style || {});

  // --- FIX STARTS HERE ---
  // We extract flex and width properties so they apply to the Container.
  // This allows the button to grow (flex: 1) within a row.
  const {
    // Layout / Positioning -> Container
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    margin,
    marginVertical,
    marginHorizontal,
    alignSelf,

    // Flex / Sizing -> Container (Moved these here)
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    width,
    height, // Optional: move height to container if you want fixed heights to work better

    // Visuals -> Face
    ...faceStyle
  } = flatStyle as ViewStyle;

  const containerStyle: ViewStyle = {
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    margin,
    marginVertical,
    marginHorizontal,
    alignSelf,
    // Apply the extracted flex/size props to the wrapper
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    width,
    height,
  };
  // --- FIX ENDS HERE ---

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <View style={containerStyle}>
        {/* 1. SHADOW LAYER */}
        <View
          style={{
            borderRadius: (faceStyle.borderRadius as number) || 0,
            backgroundColor: shadowColor,
            opacity: disabled ? 0.5 : 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            top: shadowOffset,
            left: shadowOffset,
          }}
        />

        {/* 2. FACE LAYER */}
        <Animated.View
          style={[
            {
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: "black",
              // Ensure the face fills the container now that the container handles sizing
              width: "100%",
              height: "100%",
              cursor: "pointer",
            },
            faceStyle,
            {
              transform: [{ translateX: translate }, { translateY: translate }],
              opacity: disabled ? 0.6 : 1,
              shadowColor: undefined,
              shadowOffset: undefined,
              shadowOpacity: undefined,
              elevation: undefined,
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
