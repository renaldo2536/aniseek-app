import React from "react";
import { Text, View } from "react-native";
import { Anime } from "../../types/anime";

type AnimeDetailsProps = {
  anime: Anime;
};

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime }) => {
  return (
    <View className="bg-gray-800 rounded-lg p-4">
      {anime.aired && (
        <View className="flex-row mb-2">
          <Text className="w-24 text-gray-400">Aired:</Text>
          <Text className="flex-1 text-white">{anime.aired.string}</Text>
        </View>
      )}

      {anime.episodes && (
        <View className="flex-row mb-2">
          <Text className="w-24 text-gray-400">Total Eps:</Text>
          <Text className="flex-1 text-white">{anime.episodes} Episodes</Text>
        </View>
      )}

      {anime.duration && (
        <View className="flex-row">
          <Text className="w-24 text-gray-400 mb-2">Duration:</Text>
          <Text className="flex-1 text-white">{anime.duration}</Text>
        </View>
      )}

      {anime.studios && anime.studios.length > 0 && (
        <View className="flex-row mb-2">
          <Text className="w-24 text-gray-400">Studios:</Text>
          <Text className="flex-1 text-white">
            {anime.studios.map((s) => s.name).join(", ")}
          </Text>
        </View>
      )}

      {anime.source && (
        <View className="flex-row mb-2">
          <Text className="w-24 text-gray-400">Source:</Text>
          <Text className="flex-1 text-white">{anime.source}</Text>
        </View>
      )}

      {anime.rating && (
        <View className="flex-row mb-2">
          <Text className="w-24 text-gray-400">Rating:</Text>
          <Text className="flex-1 text-white">{anime.rating}</Text>
        </View>
      )}
    </View>
  );
};

export default AnimeDetails;
