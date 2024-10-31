import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import "@fontsource/baloo-bhaina-2"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentification from "./authentification";
import Connection from "./connexionPage";
import Inscription from "./inscriptionPage";
import Chat from "../components/chat";
import Demandes from "./demandes";
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user'
//IMPORTER LES REDUCERS Exemple:
const reducers = combineReducers({ user });
const persistConfig = { key: 'gifto', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);


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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Authentification" component={Authentification} />
            <Stack.Screen name="Demandes" component={Demandes} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Connection" component={Connection} />
            <Stack.Screen name="Inscription" component={Inscription} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F7FAFE"
  }
});
