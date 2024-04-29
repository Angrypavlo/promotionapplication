import { View, Text, Animated, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const ButtonWrapper = ({ children, style, onPress }) => {
  const [buttonAnimation] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(buttonAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 40, // Increase speed for a more rapid animation
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1, // Return to original size
      useNativeDriver: true,
      speed: 40, // Match the speed of the press-in animation
    }).start();
  };

  return (
    <AnimatedTouchable
      style={[
        style,
        {
          transform: [{ scale: buttonAnimation }],
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      {children}
    </AnimatedTouchable>
  );
};

export default ButtonWrapper;
