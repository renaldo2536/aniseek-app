import { Colors } from "@/constants/Colors";
import PressableScale from "@/src/components/ui/PressableScale";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white/50",
        headerShown: false,
        animation: "shift",
        freezeOnBlur: false,
        tabBarStyle: {
          backgroundColor: Colors.light.primary,
          height: 70,
          paddingTop: 10,
        },
        tabBarIconStyle: {
          color: "white",
        },
        tabBarButton: (props) => (
          <PressableScale targetScale={0.9} {...props} android_ripple={null} />
        ),
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          lazy: true,
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="explore"
              size={size}
              color={focused ? "white" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          lazy: true,
          title: "Search",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="manage-search"
              size={size}
              color={focused ? "white" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          lazy: true,
          title: "Favorites",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="favorite"
              size={size}
              color={focused ? Colors.light.error : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
