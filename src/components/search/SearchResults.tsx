import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Anime } from "../../types/anime";
import AnimeCard from "../AnimeCard";
import { ColumnItem } from "../ui/ColumnItem";

type SearchResultsProps = {
  searchResults: Anime[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  handleAnimePress: (anime: Anime) => void;
  handleLoadMore: () => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  isLoading,
  isError,
  isFetchingNextPage,
  handleAnimePress,
  handleLoadMore,
}) => {
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#3c967b" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3c967b" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 mb-4 text-center">
          Failed to load search results. Please check your connection and try
          again.
        </Text>
      </View>
    );
  }

  return (
    <FlashList
      data={searchResults}
      renderItem={({ item, index }) => (
        <ColumnItem index={index} numColumns={2}>
          <AnimeCard anime={item} onPress={handleAnimePress} />
        </ColumnItem>
      )}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 15 }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      drawDistance={500}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center p-4 h-60">
          <Text className="text-gray-500 text-center">No results found</Text>
        </View>
      }
    />
  );
};

export default SearchResults;
