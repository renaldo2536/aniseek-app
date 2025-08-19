import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { View } from "react-native";
import EmptyFavorites from "../components/favorites/EmptyFavorites";
import FavoritesHeader from "../components/favorites/FavoritesHeader";
import FavoritesList from "../components/favorites/FavoritesList";
import { favoritesAtom } from "../store/atoms";
import { Anime } from "../types/anime";

const FavoritesScreen: React.FC = () => {
  const router = useRouter();
  const [favorites] = useAtom(favoritesAtom);

  const handleAnimePress = useCallback(
    (anime: Anime) => {
      router.push(`/anime/${anime.mal_id}`);
    },
    [router]
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FavoritesHeader count={favorites.length} />

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <FavoritesList favorites={favorites} onAnimePress={handleAnimePress} />
      )}
    </View>
  );
};

export default FavoritesScreen;
