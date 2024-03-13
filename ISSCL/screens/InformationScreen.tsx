import React, { useContext } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, Image, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/colors";
import Links from "../constants/links";
import { LanguageContext } from "../context/LanguageContext";
import * as StoreReview from "expo-store-review";

export default function Information() {
  const languageData = useContext(LanguageContext);
  const l = languageData.language;

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.miniContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/github.png")}
          width={120}
          height={120}
        ></Image>
        <Button
          color={Colors.box}
          onPress={() => handleGithubButton()}
          title={l.check_source_github}
        ></Button>
      </View>
      <View style={[styles.miniContainer, { marginTop: 50 }]}>
        <Image
          style={styles.image}
          source={require("../assets/images/linkedin.png")}
          width={120}
          height={120}
        ></Image>
        <Button
          color={Colors.box}
          onPress={() => handleLinkedinButton()}
          title={l.check_linkedin_profile}
        ></Button>
      </View>
      {/* <View style={[styles.box]}>
        <Text
          style={[{ color: Colors.primary, fontSize: 20, marginBottom: 5 }]}
        >
          {l.language}{" "}
        </Text>
        <Picker
          selectedValue={l.lang_key}
          style={{ height: 40, width: 150, color: "white" }}
          onValueChange={(v) => languageData.setLanguage(v)}
        >
          <Picker.Item label="🇺🇸 English" value="en" />
          <Picker.Item label="🇹🇷 Türkçe" value="tr" />
        </Picker>
      </View> */}
      <View style={[styles.miniContainer, { marginTop: 15 }]}>
        <Button
          color={Colors.box}
          onPress={() => StoreReview.requestReview()}
          title={l.rate_app}
        ></Button>
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
  box: {
    backgroundColor: Colors.box,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
