import React, { useContext, useMemo, useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Dimensions, CameraRoll, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import { DataContext } from "../context/DataContext";
import MapView, { Marker, Polyline } from "react-native-maps";
import route from "../constants/issRoute";
import Colors from "../constants/colors";
import BlinkBox from "../components/BlinkBox";
import { LanguageContext } from "../context/LanguageContext";

export default function Map() {
  const [toggleDistanceBlink, setToggleDistanceBlink] = useState(false);

  const contextData = useContext(DataContext);
  const data = contextData.data;
  const memoPoly = useMemo(() => <Polyline strokeWidth={1} strokeColor="blue" coordinates={route} />, []);
  const languageData = useContext(LanguageContext);
  const l = languageData.language;

  useEffect(() => {
    setToggleDistanceBlink(!toggleDistanceBlink);
  }, [data.distanceKm]);

  if (!data.issLocation) {
    return (
      <View style={[styles.container, { backgroundColor: Colors.background }]}>
        <Text style={[styles.text, { color: "#fff" }]}>{`Google Maps Loading...`}</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          opacity: 0.8,
          position: "absolute",
          zIndex: 99,
          bottom: "80%",
          backgroundColor: Colors.box,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}>
        <BlinkBox toggleBlink={toggleDistanceBlink}>
          <Text style={styles.text}>{`${l.distance}: ${data.distanceKm} km`}</Text>
        </BlinkBox>
      </View>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.mapStyle}
        initialRegion={
          data.issLocation
            ? {
                latitude: data.issLocation.Latitude,
                longitude: data.issLocation.Longitude,
                latitudeDelta: 50,
                longitudeDelta: 100,
              }
            : undefined
        }>
        {data.issLocation && (
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            image={require("../assets/images/issSmall.png")}
            coordinate={{ latitude: data.issLocation.Latitude, longitude: data.issLocation.Longitude }}
            title={"International Space Station Current Location"}
            description={`${l.latitude}: ${data.issLocation.Latitude} ${l.longitude}: ${data.issLocation.Longitude}`}
          />
        )}

        {data.userLocation && (
          <Marker
            coordinate={{ latitude: data.userLocation.Latitude, longitude: data.userLocation.Longitude }}
            title={l.your_location}
            description={`${l.latitude}: ${data.userLocation.Latitude} ${l.longitude}: ${data.userLocation.Longitude}`}
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

        {memoPoly}
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
    fontSize: 30,
    color: "#FFF",
  },
});
