import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import useData from "@/hooks/useData";
import DataContext from "@/context/DataContextt";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [data, getPermissionForLocation] = useData();
  console.log("data", data);

  return (
    <DataContext.Provider value={{ data, getPermissionForLocation }}>
      <Tabs
        screenOptions={{
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="information"
          options={{
            title: "Information",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        {/* <Tabs.Screen
          name="Map"
          options={{
            title: "Map",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        /> */}
      </Tabs>
    </DataContext.Provider>
  );
}
