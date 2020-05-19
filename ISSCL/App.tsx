import React, { useState, useEffect, createContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "./context/DataContext";
import HomePage from "./components/home/HomePage";
import Map from "./components/map/Map";
import useData from "./context/useData";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  const data = useData();
  return (
    <DataContext.Provider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
}
