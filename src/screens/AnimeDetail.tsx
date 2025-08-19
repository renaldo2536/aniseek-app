import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimeDiscussion from "../components/anime/AnimeDiscussion";
import AnimeHeader from "../components/anime/AnimeHeader";
import AnimeHeaderButtons from "../components/anime/AnimeHeaderButtons";
import AnimeOverview from "../components/anime/AnimeOverview";
import AnimeTabs from "../components/anime/AnimeTabs";
import AnimeTags from "../components/anime/AnimeTags";
import PressableScale from "../components/ui/PressableScale";
import { useAnimeDetail } from "../hooks/useAnimeData";
import useFavorites from "../hooks/useFavorites";

const AnimeDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const animeId = parseInt(id || "0", 10);
  const [activeTab, setActiveTab] = useState<"overview" | "discussion">(
    "overview"
  );

  const { data: anime, isLoading, isError, refetch } = useAnimeDetail(animeId);
  const { checkIsFavorite, toggleFavorite } = useFavorites();

  const isFavorite = anime ? checkIsFavorite(anime.mal_id) : false;

  const handleBackPress = () => {
    router.back();
  };

  const handleFavoritePress = () => {
    if (anime) {
      toggleFavorite(anime);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (isError || !anime) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900 p-4">
        <Text className="text-red-500 mb-4 text-center">
          Failed to load anime details. Please check your connection and try
          again.
        </Text>
        <PressableScale
          className="bg-primary px-6 py-3 rounded-full"
          onPress={() => refetch()}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </PressableScale>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <AnimeHeaderButtons
          isFavorite={isFavorite}
          onBackPress={handleBackPress}
          onFavoritePress={handleFavoritePress}
        />

        <AnimeHeader anime={anime} />

        <View className="px-4 pt-4">
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <Text className="text-3xl font-bold text-white mb-2">
              {anime.title}
            </Text>

            <AnimeTags anime={anime} />
          </Animated.View>

          <AnimeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "overview" && <AnimeOverview anime={anime} />}
          {activeTab === "discussion" && (
            <AnimeDiscussion title={anime.title} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AnimeDetailScreen;
