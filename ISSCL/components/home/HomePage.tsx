import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import Coordinate from "../../models/Coordinate";
import { DataContext } from "../../context/DataContext";
import colors from "../../constants/colors";

export default function HomePage() {
  const data = useContext(DataContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/iss.png")} />
      <View style={styles.box}>
        <Text style={styles.textIss}>
          ISS Latitude:{" "}
          {data.issLocation ? data.issLocation.Latitude : <ActivityIndicator size="small" color="#00ff00" />}
        </Text>
        <Text style={styles.textIss}>
          ISS Longitude:{" "}
          {data.issLocation ? data.issLocation.Longitude : <ActivityIndicator size="small" color="#00ff00" />}
        </Text>
      </View>

      {data.isLocationPermissionError ? (
        <View style={styles.box}>
          <Text style={styles.textUser}>App needs location permission 😢</Text>
        </View>
      ) : (
        <View style={styles.box}>
          <Text style={styles.textUser}>
            Your Latitude:{" "}
            {data.userLocation ? (
              data.userLocation.Latitude.toFixed(4)
            ) : (
              <ActivityIndicator size="small" color="#00ff00" />
            )}
          </Text>
          <Text style={styles.textUser}>
            Your Longitude:{" "}
            {data.userLocation ? (
              data.userLocation.Longitude.toFixed(4)
            ) : (
              <ActivityIndicator size="small" color="#00ff00" />
            )}
          </Text>
        </View>
      )}
      <View style={styles.box}>
        <Text style={styles.textDistance}>
          Distance: {data.distanceMeter} m || {data.distanceKm} km
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    transform: [{ rotateX: "0deg" }, { rotateZ: "90deg" }],
    marginBottom: 50,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: colors.box,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textIss: {
    color: colors.primary,
    fontSize: 30,
  },
  textUser: {
    color: colors.primaryVariant,
    fontSize: 30,
  },
  textDistance: {
    color: colors.secondary,
    fontSize: 20,
  },
  textTitle: {
    color: "#fff",
    fontSize: 40,
  },
});
