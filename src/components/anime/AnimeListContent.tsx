import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { Anime } from "../../types/anime";
import AnimeCard from "../AnimeCard";
import { ColumnItem } from "../ui/ColumnItem";
import PressableScale from "../ui/PressableScale";

type AnimeListContentProps = {
  animeList: Anime[];
  isLoading: boolean;
  isError: boolean;
  refreshing: boolean;
  isFetchingNextPage: boolean;
  handleAnimePress: (anime: Anime) => void;
  handleRefresh: () => void;
  handleLoadMore: () => void;
};

const AnimeListContent: React.FC<AnimeListContentProps> = ({
  animeList,
  isLoading,
  isError,
  refreshing,
  isFetchingNextPage,
  handleAnimePress,
  handleRefresh,
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

  if (isLoading && !refreshing) {
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
          Failed to load anime. Please check your connection and try again.
        </Text>
        <PressableScale
          className="bg-primary px-6 py-3 rounded-full"
          onPress={handleRefresh}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </PressableScale>
      </View>
    );
  }

  return (
    <FlashList
      data={animeList}
      renderItem={({ item, index }) => (
        <ColumnItem index={index} numColumns={2}>
          <AnimeCard anime={item} onPress={handleAnimePress} />
        </ColumnItem>
      )}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 8,
        paddingHorizontal: 12,
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      drawDistance={500}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#3c967b"]}
          tintColor="#3c967b"
        />
      }
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center p-4 h-60">
          <Text className="text-gray-500 text-center">
            No anime found. Try changing your filters.
          </Text>
        </View>
      }
    />
  );
};

export default AnimeListContent;
