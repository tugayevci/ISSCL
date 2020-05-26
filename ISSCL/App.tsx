import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DataContext } from "./context/DataContext";
import HomePage from "./components/home/HomePage";
import Map from "./components/map/Map";
import Information from "./components/information/Information";
import useData from "./context/useData";
import colors from "./constants/colors";
//import * as Analytics from "expo-firebase-analytics";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StatusBar } from "react-native";
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
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <DataContext.Provider value={data}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: "white",
              style: { backgroundColor: "dimgrey" },
            }}
            initialRouteName="Home">
            <Tab.Screen name="Information" component={Information} />
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Map" component={Map} />
          </Tab.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
    </View>
  );
}
