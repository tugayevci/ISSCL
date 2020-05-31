import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataContext } from "../context/DataContext";
import Colors from "../constants/Colors";
const moment = require("moment");
import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  const [showIssDetails, setShowIssDetails] = React.useState(false);
  const [showPeoples, setShowPeoples] = React.useState(false);
  const [showOverheads, setShowOverheads] = React.useState(false);

  const data = React.useContext(DataContext);

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
