import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5 bg-gray-50">
        <Text className="text-xl font-semibold text-gray-800 mb-4">
          This screen does not exist.
        </Text>
        <Link
          href="/(tabs)/explore"
          className="py-3 px-6 bg-primary rounded-full"
        >
          <Text className="text-white font-medium">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
