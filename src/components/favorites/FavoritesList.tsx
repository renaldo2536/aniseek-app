import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Anime } from "../../types/anime";
import { getListContainerStyle } from "../../utils/layout";
import AnimeCard from "../AnimeCard";
import { ColumnItem } from "../ui/ColumnItem";

type FavoritesListProps = {
  favorites: Anime[];
  onAnimePress: (anime: Anime) => void;
};

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onAnimePress,
}) => {
  return (
    <FlashList
      data={favorites}
      renderItem={({ item, index }) => (
        <ColumnItem index={index} numColumns={2}>
          <AnimeCard anime={item} onPress={onAnimePress} />
        </ColumnItem>
      )}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={getListContainerStyle()}
      drawDistance={500}
    />
  );
};

export default FavoritesList;
