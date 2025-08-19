import { color } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_TARGET_SCALE = 0.85;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PressableScale({
  targetScale = DEFAULT_TARGET_SCALE,
  children,
  style,
  onPressIn,
  onPressOut,
  loading = false,
  indicatorColor = "white",
  addDisabledStyle = false,
  ...rest
}: {
  targetScale?: number;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  indicatorColor?: string;
  addDisabledStyle?: boolean;
} & Exclude<PressableProps, "onPressIn" | "onPressOut" | "style">) {
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isDisabled = loading || rest.disabled;
  return (
    <AnimatedPressable
      disabled={isDisabled}
      accessibilityRole="button"
      onPressIn={(e) => {
        "worklet";
        if (onPressIn) {
          runOnJS(onPressIn)(e);
        }
        cancelAnimation(scale);
        scale.value = withTiming(targetScale, { duration: 100 });
      }}
      onPressOut={(e) => {
        "worklet";
        if (onPressOut) {
          runOnJS(onPressOut)(e);
        }
        cancelAnimation(scale);
        scale.value = withTiming(1, { duration: 100 });
      }}
      style={[
        !reducedMotion && animatedStyle,
        style,
        isDisabled &&
          addDisabledStyle && {
            backgroundColor: color.muted,
            borderColor: color["muted-foreground"],
            borderWidth: 1,
          },
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size={20} color={indicatorColor || color.primary} />
      ) : (
        children
      )}
    </AnimatedPressable>
  );
}
