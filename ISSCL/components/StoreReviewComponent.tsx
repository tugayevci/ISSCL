import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as StoreReview from "expo-store-review";
import { Alert } from "react-native";
import { LanguageContext } from "../context/LanguageContext";

export default function StoreReviewComponent() {
  const languageData = useContext(LanguageContext);
  const l = languageData.language;

  useEffect(() => {
    getIsReviwed();
  }, []);

  const getIsReviwed = async () => {
    const isReviwed = await AsyncStorage.getItem("isReviwed");
    if (!isReviwed) {
      setTimeout(() => {
        Alert.alert(
          l.rate_app,
          l.would_you_like_to_rate,
          [
            {
              text: l.rate,
              onPress: () => {
                AsyncStorage.setItem("isReviwed", "isReviwed");
                StoreReview.requestReview();
              },
            },
            {
              text: l.not_now,
              onPress: () => console.log("Not Now Pressed"),
              style: "cancel",
            },
            {
              text: l.never,
              onPress: () => AsyncStorage.setItem("isReviwed", "isReviwed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }, 30000);
    }
  };

  return <></>;
}
