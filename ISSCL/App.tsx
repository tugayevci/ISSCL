import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [issLocation, setIssLocation] = useState({ latitude: "0", longitude: "0" });
  const [userLocation, setUserLocation] = useState({} as Location.LocationData);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const getIssLocation = async () => {
      try {
        let data = await fetch("http://api.open-notify.org/iss-now.json");
        let json = await data.json();
        if (json && json.message === "success") {
          console.log("JSON", json);

          setIssLocation({
            latitude: json.iss_position.latitude,
            longitude: json.iss_position.longitude,
          });
        }
      } catch (error) {}
    };

    setInterval(() => {
      getIssLocation();
    }, 5000);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  });

  useEffect(() => {
    if (!userLocation.coords || !issLocation) return;

    const lat1 = parseInt(issLocation.latitude);
    const lon1 = parseInt(issLocation.longitude);
    const lat2 = userLocation.coords.latitude;
    const lon2 = userLocation.coords.longitude;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres
    const dFixed = parseInt(d.toFixed(0));
    setDistance(dFixed);
  });

  return (
    <View style={styles.container}>
      <Text>Latitude: {issLocation.latitude}</Text>
      <Text>Longitude: {issLocation.longitude}</Text>
      <Text>Your Latitude: {userLocation.coords && userLocation.coords.latitude}</Text>
      <Text>Your Longitude: {userLocation.coords && userLocation.coords.longitude}</Text>
      <Text>
        Distance: {distance} m || {distance / 1000} km
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
