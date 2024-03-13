import React, { useState, useEffect, useContext, createContext } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
  LayoutAnimation,
  Button,
  ActivityIndicator,
  UIManager,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/colors";
import BlinkBox from "../components/BlinkBox";
import { AntDesign } from "@expo/vector-icons";
import { LanguageContext } from "../context/LanguageContext";
import PeopleSpace from "../models/PeopleSpace";
// import PictureOfDay from "../components/PictureOfDay";
import Data from "@/models/Data";
import DataContext from "@/context/DataContextt";

const dayjs = require("dayjs");
export default function HomeScreen() {
  const [showIssDetails, setShowIssDetails] = useState(false);
  const [showPeoples, setShowPeoples] = useState(false);
  const [showOverheads, setShowOverheads] = useState(false);
  const [toggleIssBlink, setToggleIssBlink] = useState(false);
  const [toggleUserLocationBlink, setToggleUserLocationBlink] = useState(false);
  const [showDetails, setDetails] = useState(false);
  const [showPictureOfDayDetails, setShowPictureOfDayDetails] = useState(false);

  const contextData = useContext(DataContext);
  const data = contextData.data;
  const grantPermission = contextData.getPermissionForLocation;

  const languageData = useContext(LanguageContext);
  const l = languageData.language;

  useEffect(() => {
    setToggleIssBlink(!toggleIssBlink);
  }, [data.issLocation]);

  useEffect(() => {
    setToggleUserLocationBlink(!toggleUserLocationBlink);
  }, [data.userLocation]);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const allowLocationPermission = async () => {
    try {
      if (grantPermission != null) {
        grantPermission();
      }
    } catch (error) {
      console.log("error render", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.containerHeader}>
          <Text style={styles.textTitleH1}>
            <Image
              style={styles.image}
              source={require("../assets/images/iss.png")}
            />
            ISSCL
          </Text>
          <Text style={styles.textTitleH4}>
            International Space Station Current Location
          </Text>
        </View>
        <View style={{ flex: 5, marginTop: 15 }}>
          <View style={styles.box}>
            <BlinkBox toggleBlink={toggleIssBlink}>
              <View style={[{ flexDirection: "row" }]}>
                <Text style={[styles.textIss, { fontWeight: "bold" }]}>
                  ISS {l.latitude}:{" "}
                </Text>
                <Text style={[styles.textIss]}>
                  {data.issLocation ? (
                    data.issLocation.Latitude
                  ) : (
                    <ActivityIndicator
                      style={{ width: 20, height: 20 }}
                      size="small"
                      color="#fff"
                    />
                  )}
                </Text>
              </View>

              <View style={[{ flexDirection: "row" }]}>
                <Text style={[styles.textIss, { fontWeight: "bold" }]}>
                  ISS {l.longitude}:{" "}
                </Text>
                <Text style={[styles.textIss]}>
                  {data.issLocation ? (
                    data.issLocation.Longitude
                  ) : (
                    <ActivityIndicator
                      style={{ width: 20, height: 20 }}
                      size="small"
                      color="#fff"
                    />
                  )}
                </Text>
              </View>
            </BlinkBox>
          </View>

          {data.isUserLocationError ? (
            <View style={styles.box}>
              <Text style={[styles.textUser, { marginBottom: 10 }]}>
                App needs location permission 😢
              </Text>
              <Button
                onPress={() => allowLocationPermission()}
                title="Allow Location"
              ></Button>
            </View>
          ) : (
            <View style={styles.box}>
              <BlinkBox toggleBlink={toggleUserLocationBlink}>
                <View style={[{ flexDirection: "row" }]}>
                  <Text style={[styles.textUser, { fontWeight: "bold" }]}>
                    {l.your_latitude}:{" "}
                  </Text>
                  <Text style={[styles.textUser]}>
                    {data.userLocation ? (
                      data.userLocation.Latitude.toFixed(4)
                    ) : (
                      <ActivityIndicator
                        style={{ width: 20, height: 20 }}
                        size="small"
                        color="#fff"
                      />
                    )}
                  </Text>
                </View>

                <View style={[{ flexDirection: "row" }]}>
                  <Text style={[styles.textUser, { fontWeight: "bold" }]}>
                    {l.your_longitude}:{" "}
                  </Text>
                  <Text style={[styles.textUser]}>
                    {data.userLocation ? (
                      data.userLocation.Longitude.toFixed(4)
                    ) : (
                      <ActivityIndicator
                        style={{ width: 20, height: 20 }}
                        size="small"
                        color="#fff"
                      />
                    )}
                  </Text>
                </View>
              </BlinkBox>
            </View>
          )}
          <View style={styles.box}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={[styles.textDistance, { fontWeight: "bold" }]}>
                {l.distance}:{" "}
              </Text>
              <Text style={[styles.textDistance]}>
                {data.distanceMeter
                  ? `${data.distanceMeter} m || ${data.distanceMeter / 1000} km`
                  : `${l.calculating}...`}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setShowPeoples(!showPeoples);
            }}
          >
            <View style={[styles.box, { flexDirection: "column" }]}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={styles.textPeopleIss}>
                  {/* {l.there_are_currently.replace("{x}", data.peopleOnIss ? data.peopleOnIss.length.toString() : "0").toString()}{" "} */}
                  {data.peopleOnSpace
                    ? l.there_are_currently.replace(
                        "{x}",
                        data.peopleOnSpace.length.toString()
                      )
                    : l.there_are_currently.replace("{x}", "0")}
                </Text>
                <AntDesign
                  name={showPeoples ? "caretup" : "caretdown"}
                  size={20}
                  color="white"
                />
              </View>
              <View style={{ flex: 1 }}>
                {showPeoples && (
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    {data.peopleOnSpace?.map(
                      (item: PeopleSpace, index: number) => (
                        <Text
                          key={index}
                          style={styles.listItem}
                        >{`👨‍🚀 ${item.name} - ${item.craft}`}</Text>
                      )
                    )}
                  </View>
                )}
              </View>
            </View>
          </Pressable>

          {data.isUserLocationError && (
            <View style={styles.box}>
              <Text style={styles.textUser}>
                App needs location permission to get next overhead 😢
              </Text>
            </View>
          )}
          {/* {!data.isUserLocationError && (
            <Pressable
              onPress={() => {
                if (data.nextOverhead) {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setShowOverheads(!showOverheads);
                }
              }}
            >
              <View style={[styles.box, { flexDirection: "column" }]}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  {data.isNextOverheadError ? (
                    <Text style={styles.textPeopleIss}>
                      {"There is an error while calculating next overhead!"}
                    </Text>
                  ) : (
                    <Text style={styles.textPeopleIss}>
                      {l.next_overhead}{" "}
                      {data.nextOverhead.length > 0
                        ? dayjs(data.nextOverhead[0]).format("HH:MM")
                        : l.calculating + "..."}
                    </Text>
                  )}

                  {data.nextOverhead && (
                    <AntDesign
                      name={showOverheads ? "caretup" : "caretdown"}
                      size={20}
                      color="white"
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  {showOverheads && (
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      {data.nextOverhead?.map((item, index) => (
                        <Text key={index} style={styles.listItem}>{`${
                          index + 1
                        }. ${dayjs(item).format("DD/MM/YYYY HH:MM")}`}</Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          )} */}

          <Pressable
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setDetails(!showDetails);
            }}
          >
            <View style={[styles.box, { flexDirection: "column" }]}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={styles.textPeopleIss}>
                  {l.infoText1}
                  {!showDetails && "..."}
                </Text>
                <AntDesign
                  name={showDetails ? "caretup" : "caretdown"}
                  size={20}
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                {showDetails && (
                  <>
                    <Text style={[styles.textPeopleIss, { marginTop: 10 }]}>
                      {l.infoText2}
                    </Text>
                    <Image
                      resizeMode="contain"
                      style={{ width: 250, height: 250, margin: 20 }}
                      source={require("../assets/images/issBadge.png")}
                    />
                  </>
                )}
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setShowPictureOfDayDetails(!showPictureOfDayDetails);
            }}
          >
            <View style={[styles.box, { flexDirection: "column" }]}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={styles.textPictureOfDay}>{l.picture_of_day}</Text>

                <AntDesign
                  name={showPictureOfDayDetails ? "caretup" : "caretdown"}
                  size={20}
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                {/* {showPictureOfDayDetails ? (
                  <PictureOfDay details={true} />
                ) : (
                  <PictureOfDay details={false} />
                )} */}
              </View>
            </View>
          </Pressable>
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
  contentContainer: {
    paddingTop: 30,
  },
  image: {
    width: 30,
    height: 30,
    transform: [{ rotateX: "0deg" }, { rotateZ: "90deg" }],
    marginRight: 5,
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
  textPictureOfDay: {
    color: Colors.secondary,
    fontSize: 20,
    flex: 1,
  },
});
