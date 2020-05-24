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
import * as Analytics from "expo-firebase-analytics";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const data = useData();

  // useEffect(() => {
  //   const logUsageData = async () => {
  //     await Analytics.logEvent("first_open");
  //   };

  //   logUsageData();
  // }, []);

  return (
    <DataContext.Provider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          swipeEnabled
          screenOptions={({ route }: any) => ({
            tabBarIcon: ({ focused, color, size }: any) => (
              <Ionicons name={route.name === "Home" ? "ios-home" : "ios-map"} size={size} color={color} />
            ),
          })}
          tabBarOptions={{
            activeTintColor: colors.secondary,
            inactiveTintColor: "gray",
            tabStyle: {
              backgroundColor: colors.box,
            },
          }}>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
}
