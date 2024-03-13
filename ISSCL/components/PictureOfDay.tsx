import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
// import { nasaKey } from "../constants/apiKeys";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../constants/colorss";
import { LanguageContext } from "../context/LanguageContext";

const dayjs = require("dayjs");

interface IProps {
  details: boolean;
}

const PictureOfDay = ({ details }: IProps) => {
  const [pictureData, setPictureData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const languageData = useContext(LanguageContext);
  const l = languageData.language;

  useEffect(() => {
    getPicture();
  }, []);

  const handleImageButton = () => {
    Linking.canOpenURL(pictureData.hdurl).then((supported) => {
      if (supported) Linking.openURL(pictureData.hdurl);
      else console.log("Don't know how to open URI: " + pictureData.hdurl);
    });
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: pictureData.hdurl,
      });
    } catch (error) {}
  };

  const getPicture = async () => {
    try {
      const pictureString = await AsyncStorage.getItem("pictureOfDay");

      if (pictureString) {
        const jsonData = JSON.parse(pictureString);
        if (dayjs().format("YYYY-MM-DD") === jsonData.date)
          setPictureData(jsonData);
        else getPictureFromNasaApi();
      } else {
        getPictureFromNasaApi();
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const getPictureFromNasaApi = async () => {
    let data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=`);
    let json = await data.json();

    if (json) {
      setPictureData(json);
      AsyncStorage.setItem("pictureOfDay", JSON.stringify(json));
    } else {
      setIsError(true);
    }
  };

  if (isLoading)
    return (
      <ActivityIndicator
        style={{ width: 50, height: 50 }}
        size="large"
        color="#fff"
      />
    );
  if (isError)
    return <Text style={styles.textTitle}>{l.picture_of_day_error}</Text>;

  return pictureData ? (
    <>
      <Image
        resizeMode="contain"
        style={{ width: "95%", height: 300, margin: 5 }}
        source={{ uri: pictureData.url }}
      />
      {details && (
        <>
          <Text style={styles.textDetails}>
            Copyright: {pictureData.copyright}
          </Text>
          <Text style={styles.textDetails}>Title: {pictureData.title}</Text>
          <View style={{ marginTop: 10 }}>
            <Button
              onPress={handleImageButton}
              title={l.show_picture_in_browser}
            ></Button>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button onPress={onShare} title={l.share_image_link}></Button>
          </View>
        </>
      )}
    </>
  ) : (
    <ActivityIndicator
      style={{ width: 50, height: 50 }}
      size="large"
      color="#fff"
    />
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: Colors.secondary,
    fontSize: 20,
  },
  textDetails: {
    color: "#fff",
    fontSize: 20,
    flex: 1,
  },
});

export default PictureOfDay;
