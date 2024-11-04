import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import {
  BalooBhaijaan2_400Regular,
  BalooBhaijaan2_500Medium,
  BalooBhaijaan2_600SemiBold,
  BalooBhaijaan2_700Bold,
} from '@expo-google-fonts/baloo-bhaijaan-2';

import { store, persistor } from '../reducers/store'; // Import from store.js
import HomePage from './homePage';
import NotificationPage from './notificationPage';
import HistoryPage from './historyPage';
import SettingsPage from './settingsPage';
import ProfilePage from './profilePage';
import Authentification from './authentification';
import Connection from './connexionPage';
import Inscription from './inscriptionPage';
import Chat from "../components/chat";
import Demandes from "./demandes";
import RechercheTrocScreen from './rechercheTroc';
import CreeTrocScreen from './creationTroc';

// Components
import NavigationBar from '../elements/components/navigation/NavigationBar';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
// import AjoutDon from "./AjoutDonPage";
// import UploadImages from '../elements/images/UploadImages';
// // import Photos from '../elements/images/Photos';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator({ activeRoute }) {
  return (
    /*<SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RechercheTroc" component={RechercheTrocScreen} />
            <Stack.Screen name="CreationTroc" component={CreeTrocScreen} />
            <Stack.Screen name="AjoutDon" component={AjoutDon} /> 
            <Stack.Screen name="UploadImages" component={UploadImages} /> 
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
      tabBar={(props) => <NavigationBar {...props} activeRoute={activeRoute} />}
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: Colors.redColor,
        tabBarActiveTintColor: Colors.purpleColor,
        tabBarStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Notification" component={NotificationPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
      {/* screens that will have the NavigationBar */}
      {/* <Tab.Screen name="rechercheRecevoir" component={rechercheRecevoir} options={{ tabBarButton: () => null }} /> */}

    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeRoute, setActiveRoute] = useState('Home');

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={GlobalStyles.appStyle}>
          <NavigationContainer
            independent={true}
            onStateChange={(state) => {
              const currentTab = state?.routes?.[state.index]?.state?.routes?.[state.routes[state.index]?.state?.index]?.name;
              setActiveRoute(currentTab || 'Home');
            }}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="AjoutDon" component={AjoutDon} /> */}
              <Stack.Screen name="RechercheTrocScreen" component={RechercheTrocScreen}/>
              <Stack.Screen name="CreeTrocScreen" component={CreeTrocScreen}/>
              <Stack.Screen name="Authentification" component={Authentification} />
              <Stack.Screen name="TabNavigator">
                {(props) => <MainTabNavigator {...props} activeRoute={activeRoute} />}
              </Stack.Screen>
            {/* <Stack.Screen name="UploadImages" component={UploadImages} /> */}
            {/* <Stack.Screen name="Photos" component={Photos} /> */}
              <Stack.Screen name="ProfilePage" component={ProfilePage} />
              <Stack.Screen name="HistoryPage" component={HistoryPage} />
              <Stack.Screen name="Connection" component={Connection} />
              <Stack.Screen name="Inscription" component={Inscription} />
              {/* <Stack.Screen name="rechercheRecevoir" component={rechercheRecevoir} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}



