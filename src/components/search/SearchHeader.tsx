import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type SearchHeaderProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClearSearch: () => void;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <View className="bg-primary pt-10 pb-6 px-4 shadow-lg rounded-b-2xl">
      <Text className="text-white text-3xl font-bold mb-1">Explore</Text>
      <Text className="text-white/80 text-sm mb-4">
        Dont keep it in mind, search it here
      </Text>

      <View className="bg-white/10 backdrop-blur-md rounded-xl p-1 mb-2">
        <View className="flex-row items-center bg-white rounded-lg px-4 py-1 shadow-sm">
          <Ionicons name="search" size={22} color={Colors.light.primary} />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-900"
            placeholder="Jot here..."
            value={searchQuery}
            onChangeText={onSearchChange}
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={onClearSearch}>
              <Ionicons name="close-circle" size={22} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchHeader;
