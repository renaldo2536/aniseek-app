import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import useFavorites from "../hooks/useFavorites";
import { Anime } from "../types/anime";
import PressableScale from "./ui/PressableScale";

interface AnimeCardProps {
  anime: Anime;
  onPress: (anime: Anime) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onPress }) => {
  const { checkIsFavorite, toggleFavorite } = useFavorites();
  const isFavorite = checkIsFavorite(anime.mal_id);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(anime);
  };

  return (
    <View>
      <Pressable
        className="bg-primary rounded-lg overflow-hidden shadow-md mx-1 my-2"
        style={{ width: 170 }}
        onPress={() => onPress(anime)}
      >
        <View className="relative">
          <Image
            source={{ uri: anime.images.jpg.image_url }}
            style={{ height: undefined, width: 170, aspectRatio: 0.7 }}
            contentFit="cover"
          />
          <PressableScale
            className="absolute top-2 right-2 bg-white/80 rounded-full p-2"
            targetScale={0.9}
            onPress={handleFavoritePress}
          >
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={18}
              color={isFavorite ? Colors.light.primary : Colors.light.text}
            />
          </PressableScale>
        </View>
        <View className="p-2 h-20">
          <Text className="font-semibold text-white text-sm" numberOfLines={2}>
            {anime.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <AntDesign name="star" size={12} color={Colors.light.accent} />
            <Text className="text-white text-xs ml-1">
              {anime.score ? anime.score.toFixed(1) : "N/A"}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(AnimeCard);
