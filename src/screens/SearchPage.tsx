import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import SearchEmptyState from "../components/search/SearchEmptyState";
import SearchHeader from "../components/search/SearchHeader";
import SearchResults from "../components/search/SearchResults";
import { useAnimeSearch } from "../hooks/useAnimeData";
import { Anime } from "../types/anime";

const SearchScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length >= 3) {
        setDebouncedQuery(searchQuery);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnimeSearch(debouncedQuery);

  const searchResults = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  const handleAnimePress = useCallback(
    (anime: Anime) => {
      router.push(`/anime/${anime.mal_id}`);
    },
    [router]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
      />

      {debouncedQuery.length < 3 ? (
        <SearchEmptyState />
      ) : (
        <SearchResults
          searchResults={searchResults}
          isLoading={isLoading}
          isError={isError}
          isFetchingNextPage={isFetchingNextPage}
          handleAnimePress={handleAnimePress}
          handleLoadMore={handleLoadMore}
        />
      )}
    </View>
  );
};

export default SearchScreen;
