import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator, Image, FlatList } from "react-native";
import Coordinate from "../../models/Coordinate";
import { DataContext } from "../../context/DataContext";
import colors from "../../constants/colors";
const moment = require("moment");

export default function HomePage() {
  const [showIssDetails, setShowIssDetails] = useState(false);
  const [showPeoples, setShowPeoples] = useState(false);

  const data = useContext(DataContext);
  console.log("data", data);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textTitleH1}>
          <Image style={styles.image} source={require("../../assets/iss.png")} />
          ISSCL
        </Text>
        <Text style={styles.textTitleH4}>International Space Station Current Location</Text>
      </View>
      <View style={{ flex: 5 }}>
        <View style={styles.box} onTouchEnd={() => setShowIssDetails(!showIssDetails)}>
          <Text style={styles.textIss}>
            ISS Latitude:{" "}
            {data.issLocation ? data.issLocation.Latitude : <ActivityIndicator size="small" color="#00ff00" />}
          </Text>
          <Text style={styles.textIss}>
            ISS Longitude:{" "}
            {data.issLocation ? data.issLocation.Longitude : <ActivityIndicator size="small" color="#00ff00" />}
          </Text>
          {showIssDetails && <View></View>}
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
        <View style={styles.box} onTouchEnd={() => setShowPeoples(!showPeoples)}>
          <Text style={styles.textPeopleIss}>There are currently {data.peopleOnIss?.length} humans in Iss</Text>
          {showPeoples && (
            <FlatList
              data={data.peopleOnIss ? [...data.peopleOnIss] : []}
              renderItem={({ item, index }: any) => <Text key={index} style={styles.listItem}>{`👨‍🚀 ${item}`}</Text>}
            />
          )}
        </View>
        <View style={styles.box}>
          {data.isLocationPermissionError ? (
            <Text style={styles.textUser}>App needs location permission to get next overhead 😢</Text>
          ) : (
            <Text style={styles.textDistance}>
              Next Overhead: {moment(data.nextOverhead).format("DD/MM/YYYY HH:MM")}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    transform: [{ rotateX: "0deg" }, { rotateZ: "90deg" }],
    marginRight: 5,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    marginBottom: 1,
    top: 10,
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
    color: colors.primary,
    fontSize: 30,
  },
  textDistance: {
    color: colors.secondary,
    fontSize: 20,
  },
  textPeopleIss: {
    color: "#fff",
    fontSize: 20,
  },
  textTitleH1: {
    color: "#fff",
    fontSize: 40,
  },
  textTitleH4: {
    color: "#fff",
    fontSize: 15,
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "#fff",
  },
});
