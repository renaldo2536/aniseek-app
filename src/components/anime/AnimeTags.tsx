import React from "react";
import { Text, View } from "react-native";
import { Anime } from "../../types/anime";

type AnimeTagsProps = {
  anime: Anime;
};

const AnimeTags: React.FC<AnimeTagsProps> = ({ anime }) => {
  return (
    <View className="flex-row flex-wrap mb-4">
      <View className="bg-primary/20 px-3 py-1 rounded-full mr-2 mb-2">
        <Text className="text-primary font-medium">Uplifting</Text>
      </View>
      {anime.type && (
        <View className="bg-blue-500/20 px-3 py-1 rounded-full mr-2 mb-2">
          <Text className="text-blue-400 font-medium">{anime.type}</Text>
        </View>
      )}
      {anime.genres && anime.genres.length > 0 && (
        <View className="bg-green-500/20 px-3 py-1 rounded-full mr-2 mb-2">
          <Text className="text-green-400 font-medium">
            {anime.genres[0].name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AnimeTags;
