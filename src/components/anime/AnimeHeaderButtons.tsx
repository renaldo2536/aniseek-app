import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import PressableScale from "../ui/PressableScale";

type AnimeHeaderButtonsProps = {
  isFavorite: boolean;
  onBackPress: () => void;
  onFavoritePress: () => void;
};

const AnimeHeaderButtons: React.FC<AnimeHeaderButtonsProps> = ({
  isFavorite,
  onBackPress,
  onFavoritePress,
}) => {
  return (
    <>
      <View className="absolute top-12 left-4 z-10">
        <PressableScale
          className="bg-black/50 p-2 rounded-full shadow-md"
          onPress={onBackPress}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </PressableScale>
      </View>

      <View className="absolute top-12 right-4 z-10">
        <PressableScale
          className="bg-black/50 p-2 rounded-full shadow-md"
          onPress={onFavoritePress}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? Colors.light.primary : "white"}
          />
        </PressableScale>
      </View>
    </>
  );
};

export default AnimeHeaderButtons;
