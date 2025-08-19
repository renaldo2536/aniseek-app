import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { Anime } from "../../types/anime";

type AnimeHeaderProps = {
  anime: Anime;
};

const AnimeHeader: React.FC<AnimeHeaderProps> = ({ anime }) => {
  return (
    <View className="relative">
      <Image
        source={{ uri: anime.images.jpg.large_image_url }}
        style={{ width: "100%", height: undefined, aspectRatio: 1.5 }}
        contentFit="cover"
        className="rounded-b-3xl"
      />

      <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />

      <View className="absolute bottom-4 left-4 flex-row items-center">
        {anime.score && (
          <View className="bg-black/60 rounded-lg px-2 py-1 flex-row items-center mr-2">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-yellow-400 ml-1 font-bold">
              {anime.score}
            </Text>
          </View>
        )}
        {anime.rating && (
          <View className="bg-indigo-500 rounded-lg px-2 py-1">
            <Text className="text-white font-bold">{anime.rating}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AnimeHeader;
