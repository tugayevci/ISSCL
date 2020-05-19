import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import Coordinate from "../../models/Coordinate";
import { DataContext } from "../../context/DataContext";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function HomePage() {
  const data = useContext(DataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Distance: ${data.distanceKm} km`}</Text>
      <MapView style={styles.mapStyle}>
        <Marker
          coordinate={{ latitude: data.issLocation.Latitude, longitude: data.issLocation.Longitude }}
          title={"International Space Station Current Location"}
          description={`Latitude: ${data.issLocation.Latitude} Longitude: ${data.issLocation.Longitude}`}
        />
        <Marker
          coordinate={{ latitude: data.userLocation.Latitude, longitude: data.userLocation.Longitude }}
          title={"Your Location"}
          description={`Latitude: ${data.issLocation.Latitude} Longitude: ${data.issLocation.Longitude}`}
        />
        <Polyline
          strokeWidth={2}
          strokeColor="red"
          coordinates={[
            { latitude: data.issLocation.Latitude, longitude: data.issLocation.Longitude },
            { latitude: data.userLocation.Latitude, longitude: data.userLocation.Longitude },
          ]}
        />
      </MapView>
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  text: {
    position: "absolute",
    zIndex: 99,
    bottom: "80%",
    fontSize: 30,
    color: "red",
  },
});
