import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Authentification from "./authentification";
import "@fontsource/baloo-bhaina-2"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


export default function Index() {
  const [fontsLoaded] = useFonts({
    "BalooBhaina2-Regular": require("../assets/fonts/BalooBhaina2-Regular.ttf"),
  });//Police, les mains en l'air

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  } //Chargement de la police
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.main}>
        <Authentification />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F7FAFE"
  }
});