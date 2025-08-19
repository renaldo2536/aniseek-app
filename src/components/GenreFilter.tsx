import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGenres } from "../hooks/useAnimeData";
import BottomModalSheet from "./ui/BottomSheetModal";
import PressableScale from "./ui/PressableScale";

interface GenreFilterProps {
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
  selectedGenreIds?: number[];
  onSelectGenres?: (genreIds: number[]) => void;
  multiSelect?: boolean;
}

const SearchInput = ({
  bottomSheetTextInputRef,
  searchText,
  handleSearchChange,
}: {
  bottomSheetTextInputRef: React.RefObject<any>;
  searchText: string;
  handleSearchChange: (text: string) => void;
}) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-2">
      <Ionicons name="search" size={20} color="#666" />
      <BottomSheetTextInput
        ref={bottomSheetTextInputRef}
        className="flex-1 ml-2 text-gray-800"
        placeholder="Search genres..."
        placeholderTextColor="#999"
        defaultValue={searchText}
        onChangeText={handleSearchChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={() => handleSearchChange("")}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenreId,
  onSelectGenre,
  selectedGenreIds = [],
  onSelectGenres,
  multiSelect = true,
}) => {
  const { data: genreResponse, isLoading, error } = useGenres(selectedGenreIds);

  const [selectedIds, setSelectedIds] = useState<number[]>(selectedGenreIds);
  const [isVisible, setIsVisible] = useState(false);

  const bottomSheetTextInputRef = useRef<any>(null);
  useEffect(() => {
    setSelectedIds(selectedGenreIds);
  }, [selectedGenreIds, isVisible]);

  const handleOpenFilter = () => {
    setIsVisible(true);
  };
  const handleSelectGenre = useCallback(
    (genreId: number | null) => {
      if (!multiSelect) {
        onSelectGenre(genreId);
        setIsVisible(false);
      }
    },
    [multiSelect, onSelectGenre]
  );

  const handleToggleGenre = (genreId: number) => {
    if (multiSelect) {
      setSelectedIds((prev) => {
        if (prev.includes(genreId)) {
          return prev.filter((id) => id !== genreId);
        } else {
          return [...prev, genreId];
        }
      });
    }
  };

  const [searchText, setSearchText] = useState("");

  const handleChangeText = (text: string) => {
    bottomSheetTextInputRef.current?.setNativeProps({ value: text });
    setSearchText(text);
  };

  const filteredGenres = React.useMemo(() => {
    if (!genreResponse?.data) return [];

    if (!searchText.trim()) {
      return genreResponse.data.slice(0, 30);
    }

    return genreResponse.data.filter((genre) =>
      genre.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [genreResponse?.data, searchText]);

  const handleApplyFilters = () => {
    if (multiSelect && onSelectGenres) {
      const newSelectedIds = [...selectedIds];
      onSelectGenres(newSelectedIds);
    }
    setSearchText("");
    setIsVisible(false);
  };

  const renderFilterButton = () => {
    let displayText = "All";

    if (multiSelect && selectedIds.length > 0) {
      displayText = `${selectedIds.length} Genre${
        selectedIds.length > 1 ? "s" : ""
      } Selected`;
    } else if (!multiSelect && selectedGenreId) {
      const currentGenre = genreResponse?.data.find(
        (g) => g.mal_id === selectedGenreId
      );
      displayText = currentGenre ? currentGenre.name : "All";
    }

    return (
      <TouchableOpacity
        className="h-12 flex-row items-center px-4 justify-between bg-white rounded-lg mx-4 my-2 shadow-sm"
        onPress={handleOpenFilter}
      >
        <Text className="text-gray-800 font-medium">{displayText}</Text>
        <Ionicons name="filter" size={20} color={Colors.light.primary} />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View className="h-12 justify-center items-center">
        <ActivityIndicator size="small" color={Colors.light.primary} />
      </View>
    );
  }

  if (error || !genreResponse) {
    return (
      <View className="h-12 justify-center items-center">
        <Text className="text-red-500">Failed to load genres</Text>
      </View>
    );
  }

  return (
    <View>
      {renderFilterButton()}

      <BottomModalSheet
        isVisible={isVisible}
        onClose={handleApplyFilters}
        snapPoints={["70%"]}
      >
        <View className="px-4 py-3 border-b border-gray-200">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">
              {multiSelect ? "Select Genres" : "Select Genre"}
            </Text>

            {multiSelect && (
              <TouchableOpacity
                onPress={() => setSelectedIds([])}
                className="px-2 py-1"
              >
                <Text className="text-primary text-sm font-medium">
                  Clear All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <SearchInput
            bottomSheetTextInputRef={bottomSheetTextInputRef}
            searchText={searchText}
            handleSearchChange={handleChangeText}
          />
        </View>

        <View style={{ width: "100%", padding: 16, height: 700 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={true}
            bounces={true}
            nestedScrollEnabled={true}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {!multiSelect && (
                <PressableScale
                  className={`px-4 py-2 rounded-full m-1 ${
                    selectedGenreId === null ? "bg-primary" : "bg-gray-200"
                  }`}
                  onPress={() => handleSelectGenre(null)}
                >
                  <Text
                    className={`font-medium ${
                      selectedGenreId === null ? "text-white" : "text-gray-800"
                    }`}
                  >
                    All
                  </Text>
                </PressableScale>
              )}

              {filteredGenres.length === 0 && searchText.trim() !== "" && (
                <View className="w-full py-4 items-center">
                  <Text className="text-gray-500">
                    No genres match your search
                  </Text>
                </View>
              )}

              {filteredGenres.map((genre) => (
                <PressableScale
                  key={genre.mal_id}
                  className={`px-4 py-2 rounded-full m-1 ${
                    multiSelect
                      ? selectedIds.includes(genre.mal_id)
                        ? "bg-primary"
                        : "bg-gray-200"
                      : selectedGenreId === genre.mal_id
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                  onPress={() =>
                    multiSelect
                      ? handleToggleGenre(genre.mal_id)
                      : handleSelectGenre(genre.mal_id)
                  }
                >
                  <Text
                    className={`font-medium ${
                      multiSelect
                        ? selectedIds.includes(genre.mal_id)
                          ? "text-white"
                          : "text-gray-800"
                        : selectedGenreId === genre.mal_id
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {genre.name}
                  </Text>
                </PressableScale>
              ))}
            </View>
          </ScrollView>
        </View>
      </BottomModalSheet>
    </View>
  );
};

export default GenreFilter;
