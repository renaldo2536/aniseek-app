import React from "react";
import { Text, View } from "react-native";
import PressableScale from "../ui/PressableScale";

type AnimeDiscussionProps = {
  title: string;
};

const AnimeDiscussion: React.FC<AnimeDiscussionProps> = ({ title }) => {
  return (
    <View className="items-center justify-center py-8">
      <Text className="text-white text-lg font-medium mb-2">
        Join the conversation!
      </Text>
      <Text className="text-gray-400 text-center mb-6">
        Be the first to share your thoughts about {title}
      </Text>
      <PressableScale className="bg-primary px-6 py-3 rounded-lg">
        <Text className="text-white font-semibold">Join Conversation</Text>
      </PressableScale>
    </View>
  );
};

export default AnimeDiscussion;
