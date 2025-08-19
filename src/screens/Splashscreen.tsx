import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import TypeWriter from "../components/ui/TypeWriter";

export default function Splashscreen() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)/explore");
    }, 4000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Image
        source={require("@/assets/images/aniseek.png")}
        style={{ width: 200, height: 30 }}
        contentFit="cover"
      />
      <View className="mt-4">
        <TypeWriter
          text="Seek your favorite anime"
          className="text-primary text-2xl font-bold"
          speed={80}
          delay={800}
        />
      </View>
    </View>
  );
}
