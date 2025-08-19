import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const SearchEmptyState: React.FC = () => {
  return (
    <Animated.View
      className="flex-1 justify-center items-center p-6"
      entering={FadeIn.duration(300)}
    >
      <Ionicons name="search" size={40} color="#d1d5db" />
      <Text className="text-gray-500 mt-4 text-center">
        Jot in atleast 3 characters to start exploring
      </Text>
    </Animated.View>
  );
};

export default SearchEmptyState;
