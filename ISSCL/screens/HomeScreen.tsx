import React, { useState, useEffect, useContext } from "react";
import { Image, Platform, StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataContext } from "../context/DataContext";
import Colors from "../constants/Colors";
import BlinkBox from "../components/BlinkBox";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";

const moment = require("moment");

export default function HomeScreen() {
  const [showIssDetails, setShowIssDetails] = useState(false);
  const [showPeoples, setShowPeoples] = useState(false);
  const [showOverheads, setShowOverheads] = useState(false);
  const [toggleIssBlink, setToggleIssBlink] = useState(false);
  const [toggleUserLocationBlink, setToggleUserLocationBlink] = useState(false);
  const [loadingDots, setLoadingDots] = useState<string[]>([]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLoadingDots((dots) => [...dots, "."]);
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (loadingDots.length > 2) setLoadingDots([]);
  // }, [loadingDots]);

  const data = useContext(DataContext);

  useEffect(() => {
    setToggleIssBlink(!toggleIssBlink);
  }, [data.issLocation]);

  useEffect(() => {
    setToggleUserLocationBlink(!toggleUserLocationBlink);
  }, [data.userLocation]);

  const allowLocationPermission = async () => {
    await Location.requestPermissionsAsync();
  };

  console.log("load", loadingDots);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.textTitleH1}>
            <Image style={styles.image} source={require("../assets/images/iss.png")} />
            ISSCL
          </Text>
          <Text style={styles.textTitleH4}>International Space Station Current Location</Text>
        </View>
        <View style={{ flex: 5, marginTop: 15 }}>
          <View style={styles.box}>
            <BlinkBox toggleBlink={toggleIssBlink}>
              <Text style={styles.textIss}>ISS Latitude: {data.issLocation ? data.issLocation.Latitude : loadingDots.join("")}</Text>
              <Text style={styles.textIss}>ISS Longitude: {data.issLocation ? data.issLocation.Longitude : loadingDots.join("")}</Text>
            </BlinkBox>
          </View>

          {data.isLocationPermissionError ? (
            <View style={styles.box}>
              <Text style={[styles.textUser, { marginBottom: 10 }]}>App needs location permission 😢</Text>
              <Button onPress={() => allowLocationPermission()} title="Allow Location"></Button>
            </View>
          ) : (
            <View style={styles.box}>
              <BlinkBox toggleBlink={toggleUserLocationBlink}>
                <Text style={styles.textUser}>Your Latitude: {data.userLocation ? data.userLocation.Latitude.toFixed(4) : loadingDots.join("")}</Text>
                <Text style={styles.textUser}>
                  Your Longitude: {data.userLocation ? data.userLocation.Longitude.toFixed(4) : loadingDots.join("")}
                </Text>
              </BlinkBox>
            </View>
          )}
          <View style={styles.box}>
            <Text style={styles.textDistance}>
              Distance: {data.distanceMeter} m || {data.distanceKm} km
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setShowPeoples(!showPeoples);
            }}>
            <View style={[styles.box, { flexDirection: "column" }]}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={styles.textPeopleIss}>There are currently {data.peopleOnIss?.length} humans in Space </Text>
                <AntDesign name={showPeoples ? "caretup" : "caretdown"} size={20} color="white" />
              </View>
              <View style={{ flex: 1 }}>
                {showPeoples && (
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    {data.peopleOnIss?.map((item, index) => (
                      <Text key={index} style={styles.listItem}>{`👨‍🚀 ${item.name} - ${item.craft}`}</Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {data.isLocationPermissionError && (
            <View style={styles.box}>
              <Text style={styles.textUser}>App needs location permission to get next overhead 😢</Text>
            </View>
          )}
          {!data.isLocationPermissionError && (
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setShowOverheads(!showOverheads);
              }}>
              <View style={[styles.box, { flexDirection: "column" }]}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.textPeopleIss}>Next Overhead at {moment(data.nextOverhead ? data.nextOverhead[0] : null).format("HH:MM")}</Text>
                  <AntDesign name={showOverheads ? "caretup" : "caretdown"} size={20} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                  {showOverheads && (
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      {data.nextOverhead?.map((item, index) => (
                        <Text key={index} style={styles.listItem}>{`${index + 1}. Overhead ${moment(item).format("DD/MM/YYYY HH:MM")}`}</Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },

  image: {
    width: 30,
    height: 30,
    transform: [{ rotateX: "0deg" }, { rotateZ: "90deg" }],
    marginRight: 5,
  },
  scrollView: {
    marginHorizontal: 8,
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
    flex: 1,
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
