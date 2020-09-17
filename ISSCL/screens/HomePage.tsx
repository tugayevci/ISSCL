import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from "react-native";
import Coordinate from "../models/Coordinate";
import { DataContext } from "../context/DataContext";
import Colors from "../constants/colors";
const moment = require("moment");

export default function HomePage() {
  const [showIssDetails, setShowIssDetails] = useState(false);
  const [showPeoples, setShowPeoples] = useState(false);
  const [showOverheads, setShowOverheads] = useState(false);

  const dataCo = useContext(DataContext);
  const data = dataCo.data;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerHeader}>
          <Text style={styles.textTitleH1}>
            <Image style={styles.image} source={require("../../assets/iss.png")} />
            ISSCL
          </Text>
          <Text style={styles.textTitleH4}>International Space Station Current Location</Text>
        </View>
        <View style={{ flex: 5, marginTop: 15 }}>
          <View style={styles.box} onTouchEnd={() => setShowIssDetails(!showIssDetails)}>
            <Text style={styles.textIss}>ISS Latitude: {data.issLocation ? data.issLocation.Latitude : "..."}</Text>
            <Text style={styles.textIss}>ISS Longitude: {data.issLocation ? data.issLocation.Longitude : "..."}</Text>
            {showIssDetails && <View></View>}
          </View>

          {data.isLocationPermissionError ? (
            <View style={styles.box}>
              <Text style={styles.textUser}>App needs location permission 😢</Text>
            </View>
          ) : (
            <View style={styles.box}>
              <Text style={styles.textUser}>Your Latitude: {data.userLocation ? data.userLocation.Latitude.toFixed(4) : "..."}</Text>
              <Text style={styles.textUser}>Your Longitude: {data.userLocation ? data.userLocation.Longitude.toFixed(4) : "..."}</Text>
            </View>
          )}
          <View style={styles.box}>
            <Text style={styles.textDistance}>
              Distance: {data.distanceMeter} m || {data.distanceKm} km
            </Text>
          </View>
          <View style={styles.box} onTouchEnd={() => setShowPeoples(!showPeoples)}>
            <Text style={styles.textPeopleIss}>There are currently {data.peopleOnIss?.length} humans in Space</Text>
            {showPeoples && (
              <FlatList
                data={data.peopleOnIss ? [...data.peopleOnIss] : []}
                renderItem={({ item }: any) => <Text key={item.name} style={styles.listItem}>{`👨‍🚀 ${item.name} - ${item.craft}`}</Text>}
              />
            )}
          </View>

          {data.isLocationPermissionError && (
            <View style={styles.box}>
              <Text style={styles.textUser}>App needs location permission to get next overhead 😢</Text>
            </View>
          )}

          {!data.isLocationPermissionError && (
            <View style={styles.box} onTouchEnd={() => setShowOverheads(!showOverheads)}>
              <Text style={styles.textPeopleIss}>Next Overhead at {moment(data.nextOverhead ? data.nextOverhead[0] : null).format("HH:MM")}</Text>
              {showOverheads && (
                <FlatList
                  data={data.nextOverhead ? [...data.nextOverhead] : []}
                  renderItem={({ item, index }: any) => (
                    <Text key={item} style={styles.listItem}>{`${index + 1}. Overhead ${moment(item).format("DD/MM/YYYY HH:MM")}`}</Text>
                  )}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
  scrollView: {
    marginHorizontal: 8,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    marginBottom: 1,
    top: 10,
  },
  box: {
    backgroundColor: Colors.box,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textIss: {
    color: Colors.primary,
    fontSize: 30,
  },
  textUser: {
    color: Colors.primary,
    fontSize: 30,
  },
  textDistance: {
    color: Colors.secondary,
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
