import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const EmptyFavorites: React.FC = () => {
  return (
    <Animated.View
      className="flex-1 justify-center items-center p-6"
      entering={FadeIn.duration(300)}
    >
      <View className="bg-white p-6 rounded-2xl shadow-md items-center max-w-xs">
        <View className="bg-primary/10 p-4 rounded-full mb-4">
          <Ionicons
            name="heart-outline"
            size={40}
            color={Colors.light.primary}
          />
        </View>
        <Text className="text-xl font-semibold text-gray-800 mb-2 text-center">
          No favorites yet
        </Text>
        <Text className="text-gray-600 text-center mb-2">
          Start exploring and add your favorite anime to this list!
        </Text>
      </View>
    </Animated.View>
  );
};

export default EmptyFavorites;
