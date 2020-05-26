import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, Button, Image, Linking } from "react-native";
import colors from "../../constants/colors";
import links from "../../constants/links";

export default function Information() {
  const handleGithubButton = () => {
    Linking.canOpenURL(links.github).then((supported) => {
      if (supported) Linking.openURL(links.github);
      else console.log("Don't know how to open URI: " + links.github);
    });
  };

  const handleLinkedinButton = () => {
    Linking.canOpenURL(links.linkedin).then((supported) => {
      if (supported) Linking.openURL(links.linkedin);
      else console.log("Don't know how to open URI: " + links.linkedin);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.miniContainer}>
        <Image style={styles.image} source={require("../../assets/github.png")}></Image>
        <Button color={colors.box} onPress={() => handleGithubButton()} title="View Source Code On Github"></Button>
      </View>
      <View style={styles.miniContainer}>
        <Image style={styles.image} source={require("../../assets/linkedin.png")}></Image>
        <Button color={colors.box} onPress={() => handleLinkedinButton()} title="Check My Profile On Linkedin"></Button>
      </View>
      <View style={{ flex: 2 }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: colors.box,
  },
});
