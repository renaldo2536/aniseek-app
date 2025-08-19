import React from "react";
import { Text, View } from "react-native";
import GenreFilter from "../GenreFilter";

type AnimeListHeaderProps = {
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
  selectedGenreIds: number[];
  onSelectGenres: (genreIds: number[]) => void;
};

const AnimeListHeader: React.FC<AnimeListHeaderProps> = ({
  selectedGenreId,
  onSelectGenre,
  selectedGenreIds,
  onSelectGenres,
}) => {
  return (
    <View className="bg-primary pt-10 pb-4 px-4 rounded-b-2xl shadow-md">
      <Text className="text-white text-3xl font-bold mb-1">Discover</Text>
      <Text className="text-white/80 text-sm mb-4">
        Find your next favorite anime
      </Text>
      <GenreFilter
        selectedGenreId={selectedGenreId}
        onSelectGenre={onSelectGenre}
        selectedGenreIds={selectedGenreIds}
        onSelectGenres={onSelectGenres}
        multiSelect={true}
      />
    </View>
  );
};

export default AnimeListHeader;
