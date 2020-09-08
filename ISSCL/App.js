import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import useData from "./hooks/useData";
import { DataContext } from "./context/DataContext";
import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { useLanguage } from "./hooks/useLanguage";
import { LanguageContext } from "./context/LanguageContext";

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [data, grantPermission] = useData();
  const [language, setLanguage] = useLanguage();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <DataContext.Provider value={{ data, grantPermission }}>
            <LanguageContext.Provider value={{ language, setLanguage }}>
              <BottomTabNavigator />
            </LanguageContext.Provider>
          </DataContext.Provider>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
