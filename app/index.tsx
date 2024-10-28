import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Authentification from "./authentification";
import "@fontsource/baloo-bhaina-2"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connection from "./connexionPage";
import Inscription from "./inscriptionPage";

export default function Index() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    "BalooBhaina2-Regular": require("../assets/fonts/BalooBhaina2-Regular.ttf"),
  });//Police, les mains en l'air

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  } //Chargement de la police
  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentification" component={Authentification} />
        <Stack.Screen name="Connection" component={Connection} />
        <Stack.Screen name="Inscription" component={Inscription} />
      </Stack.Navigator>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F7FAFE"
  }
});