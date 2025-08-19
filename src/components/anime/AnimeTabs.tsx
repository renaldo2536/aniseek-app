import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Tab = "overview" | "discussion";

type AnimeTabsProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

const AnimeTabs: React.FC<AnimeTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View className="flex-row border-b border-gray-800 mb-4">
      <TouchableOpacity
        className={`px-4 py-2 ${
          activeTab === "overview" ? "border-b-2 border-primary" : ""
        }`}
        onPress={() => setActiveTab("overview")}
      >
        <Text
          className={`font-medium ${
            activeTab === "overview" ? "text-primary" : "text-gray-400"
          }`}
        >
          Overview
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-4 py-2 ${
          activeTab === "discussion" ? "border-b-2 border-primary" : ""
        }`}
        onPress={() => setActiveTab("discussion")}
      >
        <Text
          className={`font-medium ${
            activeTab === "discussion" ? "text-primary" : "text-gray-400"
          }`}
        >
          Discussion
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimeTabs;
