import React, { useContext } from "react";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import InformationScreen from "../screens/InformationScreen";
import MapScreen from "../screens/MapScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../constants/colors";
import { LanguageContext } from "../context/LanguageContext";

const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator() {
  const languageData = useContext(LanguageContext);
  const l = languageData.language;

  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: { backgroundColor: Colors.box },
        activeTintColor: Colors.secondary,
      }}>
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{
          title: l.options,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="InformationScreen" />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: l.home,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="HomeScreen" />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: l.map,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="MapScreen" />,
        }}
      />
    </Tab.Navigator>
  );

  //test
}
