import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import AnimeListContent from "../components/anime/AnimeListContent";
import AnimeListHeader from "../components/anime/AnimeListHeader";
import { useAnimeByGenre } from "../hooks/useAnimeData";
import { selectedGenreAtom, selectedGenresAtom } from "../store/atoms";
import { Anime } from "../types/anime";

const AnimeListScreen: React.FC = () => {
  const router = useRouter();
  const [selectedGenreId, setSelectedGenreId] = useAtom(selectedGenreAtom);
  const [selectedGenres, setSelectedGenres] = useAtom(selectedGenresAtom);
  const [refreshing, setRefreshing] = useState(false);

  const activeGenreFilter =
    selectedGenres.length > 0 ? selectedGenres : selectedGenreId;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useAnimeByGenre(activeGenreFilter);

  const animeList = React.useMemo(() => {
    if (!data) return [];

    // Remove duplicates data from APIs as it seems there is some duplicates data.
    const allAnime = data.pages.flatMap((page) => page.data);
    const uniqueAnimeMap = new Map<number, Anime>();

    allAnime.forEach((anime) => {
      uniqueAnimeMap.set(anime.mal_id, anime);
    });

    return Array.from(uniqueAnimeMap.values());
  }, [data]);

  const handleAnimePress = useCallback(
    (anime: Anime) => {
      router.push({
        pathname: "/anime/[id]",
        params: { id: anime.mal_id.toString() },
      });
    },
    [router]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1 bg-gray-20">
      <AnimeListHeader
        selectedGenreId={selectedGenreId}
        onSelectGenre={setSelectedGenreId}
        selectedGenreIds={selectedGenres}
        onSelectGenres={setSelectedGenres}
      />

      <AnimeListContent
        animeList={animeList}
        isLoading={isLoading}
        isError={isError}
        refreshing={refreshing}
        isFetchingNextPage={isFetchingNextPage}
        handleAnimePress={handleAnimePress}
        handleRefresh={handleRefresh}
        handleLoadMore={handleLoadMore}
      />
    </View>
  );
};

export default AnimeListScreen;
