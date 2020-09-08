import React, { createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import EN from "./en";
import TR from "./tr";

const getPreferedLanguage = () => {
  // const language =  AsyncStorage.getItem("language");
  const language = "en";
  let languagePack = EN;

  if (language) {
    switch (language) {
      // case "tr":
      //   languagePack = TR;
      //   break;
      case "en":
        languagePack = EN;
        break;
      default:
        break;
    }
  }

  return languagePack;
};

export const LanguageContext = createContext({ language: getPreferedLanguage(), setLanguage: new Function() });
