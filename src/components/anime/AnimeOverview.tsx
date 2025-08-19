import React from "react";
import { Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Anime } from "../../types/anime";
import AnimeDetails from "./AnimeDetails";

type AnimeOverviewProps = {
  anime: Anime;
};

const AnimeOverview: React.FC<AnimeOverviewProps> = ({ anime }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(200)}>
      <Text className="text-gray-300 leading-6 mb-6">
        {anime.synopsis || "No synopsis available."}
      </Text>

      <Text className="text-lg font-bold text-white mt-6 mb-4">DETAILS</Text>
      <AnimeDetails anime={anime} />
    </Animated.View>
  );
};

export default AnimeOverview;
