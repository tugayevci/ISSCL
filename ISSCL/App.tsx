import React, { useState, useEffect, createContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Coordinate from "./models/Coordinate";
import { DataContext } from "./context/DataContext";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/home/HomePage";
import useData from "./context/useData";
const Stack = createStackNavigator();

export default function App() {
  const data = useData();

  // useEffect(() => {
  //   const getIssLocation = async () => {
  //     try {
  //       let data = await fetch("http://api.open-notify.org/iss-now.json");
  //       let json = await data.json();
  //       if (json && json.message === "success") {
  //         const coordinate = new Coordinate({
  //           Latitude: parseFloat(json.iss_position.latitude),
  //           Longitude: parseFloat(json.iss_position.longitude),
  //         });
  //         setIssLocation(coordinate);
  //       }
  //     } catch (error) {}
  //   };

  //   setInterval(() => {
  //     getIssLocation();
  //   }, 5000);
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("App needs permission 😢");
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     const coordinate = new Coordinate({
  //       Latitude: location.coords.latitude,
  //       Longitude: location.coords.longitude,
  //     });
  //     setUserLocation(coordinate);
  //   })();
  // });

  // useEffect(() => {
  //   if (!userLocation || !issLocation) return;

  //   const lat1 = issLocation.Latitude;
  //   const lon1 = issLocation.Longitude;
  //   const lat2 = userLocation.Latitude;
  //   const lon2 = userLocation.Longitude;

  //   const R = 6371e3; // metres
  //   const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  //   const φ2 = (lat2 * Math.PI) / 180;
  //   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  //   const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  //   const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const d = R * c; // in metres
  //   const dFixed = parseInt(d.toFixed(0));

  //   setDistance(dFixed);
  // });

  return (
    <DataContext.Provider value={data}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
        <View style={styles.container}>
          {/* <Text>
          ISS Latitude: {issLocation ? issLocation.Latitude : <ActivityIndicator size="small" color="#00ff00" />}
        </Text>
        <Text>
          ISS Longitude: {issLocation ? issLocation.Longitude : <ActivityIndicator size="small" color="#00ff00" />}
        </Text> */}
          {/* <Text>
        Your Latitude:{" "}
        {errorMsg || (userLocation ? userLocation.Latitude : <ActivityIndicator size="small" color="#00ff00" />)}
      </Text>
      <Text>
        Your Longitude:{" "}
        {errorMsg || (userLocation ? userLocation.Longitude : <ActivityIndicator size="small" color="#00ff00" />)}
      </Text> */}
          {/* <Text>
          Distance: {distance} m || {distance / 1000} km
        </Text> */}
        </View>
      </NavigationContainer>
    </DataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
