import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type FavoritesHeaderProps = {
  count: number;
};

const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({ count }) => {
  return (
    <View className="bg-primary pt-10 pb-6">
      <View className="flex-row px-4 mb-4">
        <Text className="text-white text-3xl font-bold">Favorites</Text>
      </View>

      <View className="bg-white mx-4 p-3 rounded-xl shadow-md flex-row items-center">
        <View className="bg-primary/20 p-2 rounded-full mr-3">
          <Ionicons name="bookmark" size={20} color={Colors.light.primary} />
        </View>
        <View>
          <Text className="text-gray-800 font-bold text-base">
            {count} Titles Saved
          </Text>
          <Text className="text-gray-500 text-xs">
            Your personal collection
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FavoritesHeader;
