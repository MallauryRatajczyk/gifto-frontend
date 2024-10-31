// Import connectivity and dependencies:
import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import "@fontsource/baloo-bhaina-2"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import {
  BalooBhaijaan2_400Regular,
  BalooBhaijaan2_500Medium,
  BalooBhaijaan2_600SemiBold,
  BalooBhaijaan2_700Bold,
} from '@expo-google-fonts/baloo-bhaijaan-2';

// Redux imports
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';


// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomePage from './homePage';
import NotificationPage from './notificationPage';
import SettingsPage from './settingsPage';
import Authentification from './authentification';
import Connection from './connexionPage';
import Inscription from './inscriptionPage';
import Chat from "../components/chat";
import Demandes from "./demandes";

// Components
import NavigationBar from '../elements/components/navigation/NavigationBar';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';

// Combine reducers
const reducers = combineReducers({ user });

// Configure redux-persist
const persistConfig = {
  key: 'gifto',
  storage: AsyncStorage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Create persistor
const persistor = persistStore(store);

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Main Tab Navigator Component (included directly in index.js)
function MainTabNavigator() {
  return (
    /*<SafeAreaProvider>
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
    </SafeAreaProvider>*/
    <Tab.Navigator
      tabBar={(props) => <NavigationBar {...props} />}
      screenOptions={{ headerShown: false, tabBarInactiveTintColor: Colors.redColor, tabBarActiveTintColor: Colors.purpleColor }}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Notification" component={NotificationPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BalooBhaijaan2_400Regular,
        BalooBhaijaan2_500Medium,
        BalooBhaijaan2_600SemiBold,
        BalooBhaijaan2_700Bold,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <View style={GlobalStyles.appStyle}>

          <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Authentification" component={Authentification} />
              <Stack.Screen name="TabNavigator" component={MainTabNavigator} />
              <Stack.Screen name="Connection" component={Connection} />
              <Stack.Screen name="Inscription" component={Inscription} />
              <Stack.Screen name="HomePage" component={HomePage} />

            </Stack.Navigator>
          </NavigationContainer>


        </View>

      </PersistGate>
    </Provider>
  );
}




/*

//import { GiftoSymbol, GiftoLogo } from '../elements/assets/Icons';
//import BigCardButton from '../elements/components/buttons/BigCardButton';

      <GiftoLogo width={80} height={80} color={Colors.greenColor} />

      <GiftoSymbol width={50} height={50} color={Colors.redColor} />


              <Stack.Screen name="Authentification" component={Authentification} />
              <Stack.Screen name="Connection" component={Connection} />
              <Stack.Screen name="Inscription" component={Inscription} />
              <Stack.Screen name="TabNavigator" component={MainTabNavigator} />
              <Stack.Screen name="HomePage" component={HomePage} />

                        <NavigationContainer independent={true} >
                        for later, we need to add the independent as true when I return the lognin page AMIR




            
*/