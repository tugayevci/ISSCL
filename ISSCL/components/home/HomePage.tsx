import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Coordinate from "../../models/Coordinate";
import { DataContext } from "../../context/DataContext";

export default function HomePage() {
  const data = useContext(DataContext);

  return (
    <View style={styles.container}>
      <Text>
        ISS Latitude:{" "}
        {data.issLocation ? data.issLocation.Latitude : <ActivityIndicator size="small" color="#00ff00" />}
      </Text>
      <Text>
        ISS Longitude:{" "}
        {data.issLocation ? data.issLocation.Longitude : <ActivityIndicator size="small" color="#00ff00" />}
      </Text>
      {/* <Text>
        Your Latitude:{" "}
        {errorMsg || (userCoordinate ? userCoordinate.Latitude : <ActivityIndicator size="small" color="#00ff00" />)}
      </Text>
      <Text>
        Your Longitude:{" "}
        {errorMsg || (userCoordinate ? userCoordinate.Longitude : <ActivityIndicator size="small" color="#00ff00" />)}
      </Text> */}
      <Text>
        Distance: {data.distanceMeter} m || {data.distanceKm} km
      </Text>
    </View>
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
