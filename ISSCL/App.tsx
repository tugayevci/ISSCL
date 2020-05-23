import React, { useState, useEffect, createContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "./context/DataContext";
import HomePage from "./components/home/HomePage";
import Map from "./components/map/Map";
import useData from "./context/useData";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import colors from "./constants/colors";

const Tab = createBottomTabNavigator();

export default function App() {
  const data = useData();
  return (
    <DataContext.Provider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
              } else if (route.name === "Map") {
                iconName = focused ? "ios-map" : "ios-map";
              }
              return <Ionicons name={iconName || ""} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.secondary,
            inactiveTintColor: "gray",
            tabStyle: {
              backgroundColor: colors.box,
            },
          }}>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Map" component={HomePage} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
}
