import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import EN from "../context/en";
import TR from "../context/tr";

export const useLanguage = () => {
  // const localStorageLanguage =  AsyncStorage.getItem("language");
  // const [language, setLanguage] = useState(localStorageLanguage || "en");
  const [language, setLanguage] = useState("en");

  const setMode = async (key: any) => {
    AsyncStorage.setItem("language", key);
    setLanguage(key);
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    AsyncStorage.getItem("language").then((x) => setLanguage(x || "en"));
  };

  switch (language) {
    case "tr":
      return [TR, setMode];

    case "en":
      return [EN, setMode];

    default:
      return [EN, setMode];
  }
};
