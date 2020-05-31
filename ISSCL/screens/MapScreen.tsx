import React, { useContext } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { DataContext } from "../context/DataContext";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function Map() {
  const data = useContext(DataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Distance: ${data.distanceKm} km`}</Text>
      <MapView style={styles.mapStyle}>
        {data.issLocation && (
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            image={require("../assets/images/issSmall.png")}
            coordinate={{ latitude: data.issLocation.Latitude, longitude: data.issLocation.Longitude }}
            title={"International Space Station Current Location"}
            description={`Latitude: ${data.issLocation.Latitude} Longitude: ${data.issLocation.Longitude}`}
          />
        )}

        {data.userLocation && (
          <Marker
            coordinate={{ latitude: data.userLocation.Latitude, longitude: data.userLocation.Longitude }}
            title={"Your Location"}
            description={`Latitude: ${data.userLocation.Latitude} Longitude: ${data.userLocation.Longitude}`}
          />
        )}

        {data.issLocation && data.userLocation && (
          <Polyline
            strokeWidth={2}
            strokeColor="red"
            coordinates={[
              { latitude: data.issLocation.Latitude, longitude: data.issLocation.Longitude },
              { latitude: data.userLocation.Latitude, longitude: data.userLocation.Longitude },
            ]}
          />
        )}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
