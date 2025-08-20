import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import * as SplashScreen from 'expo-splash-screen';
import { styles } from "./src/styles/styles";
import { KaiseiHarunoUmi_400Regular } from '@expo-google-fonts/kaisei-harunoumi';
import { Raleway_400Regular } from '@expo-google-fonts/raleway';
import { SortsMillGoudy_400Regular } from '@expo-google-fonts/sorts-mill-goudy';
import { useFonts } from "expo-font";
import { View } from "react-native";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    KaiseiHarunoUmi_400Regular,
    Raleway_400Regular,
    SortsMillGoudy_400Regular
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <AppNavigator />
}
