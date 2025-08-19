import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface TypeWriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  className,
  speed = 100,
  delay = 500,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const cursorOpacity = useSharedValue(0);

  useEffect(() => {
    if (isComplete) {
      cursorOpacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    }
  }, [isComplete]);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    cursorOpacity.value = 1;

    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          const nextChar = text.charAt(currentIndex);
          setDisplayedText((prev) => prev + nextChar);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [text, speed, delay]);

  const cursorStyle = useAnimatedStyle(() => {
    return {
      opacity: cursorOpacity.value,
    };
  });

  return (
    <View className="flex-row">
      <Text className={className}>{displayedText}</Text>
      <Animated.Text className={`${className}`} style={cursorStyle}>
        |
      </Animated.Text>
    </View>
  );
};

export default TypeWriter;
