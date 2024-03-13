import React, { useContext, useMemo, useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import route from "../constants/issRoute";
import Colors from "../constants/colors";
import BlinkBox from "../components/BlinkBox";
import { LanguageContext } from "../context/LanguageContext";
import DataContext from "@/context/DataContextt";

export default function Map() {
  const [toggleDistanceBlink, setToggleDistanceBlink] = useState(false);

  const contextData = useContext(DataContext);
  const data = contextData.data;
  // const memoPoly = useMemo(
  //   () => <Polyline strokeWidth={1} strokeColor="blue" coordinates={route} />,
  //   []
  // );
  const languageData = useContext(LanguageContext);
  const l = languageData.language;

  useEffect(() => {
    setToggleDistanceBlink(!toggleDistanceBlink);
  }, [data.distanceMeter]);

  if (!data.issLocation) {
    return (
      <View style={[styles.container, { backgroundColor: Colors.background }]}>
        <Text
          style={[styles.text, { color: "#fff" }]}
        >{`Google Maps Loading...`}</Text>
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
        }}
      >
        <BlinkBox toggleBlink={toggleDistanceBlink}>
          <Text style={styles.text}>
            {" "}
            {data.distanceMeter
              ? `${l.distance}: ${data.distanceMeter} m || ${
                  data.distanceMeter / 1000
                } km`
              : `${l.calculating}...`}
          </Text>
        </BlinkBox>
      </View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
