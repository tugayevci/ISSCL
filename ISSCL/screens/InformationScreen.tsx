import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, Image, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Links from "../constants/Links";

export default function Information() {
  const handleGithubButton = () => {
    Linking.canOpenURL(Links.github).then((supported) => {
      if (supported) Linking.openURL(Links.github);
      else console.log("Don't know how to open URI: " + Links.github);
    });
  };

  const handleLinkedinButton = () => {
    Linking.canOpenURL(Links.linkedin).then((supported) => {
      if (supported) Linking.openURL(Links.linkedin);
      else console.log("Don't know how to open URI: " + Links.linkedin);
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.miniContainer}>
        <Image style={styles.image} source={require("../assets/images/github.png")}></Image>
        <Button color={Colors.box} onPress={() => handleGithubButton()} title="View Source Code On Github"></Button>
      </View>
      <View style={styles.miniContainer}>
        <Image style={styles.image} source={require("../assets/images/linkedin.png")}></Image>
        <Button color={Colors.box} onPress={() => handleLinkedinButton()} title="Check My Profile On Linkedin"></Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingTop: 15,
  },
  miniContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    zIndex: 99,
    bottom: "80%",
    fontSize: 30,
    color: "red",
  },
  image: {
    width: 120,
    height: 120,
  },
  button: {
    backgroundColor: Colors.box,
  },
});
