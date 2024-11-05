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
//Import elements
import { store, persistor } from '../reducers/store';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import NavigationBar from '../elements/components/navigation/NavigationBar';
//import pages
import Authentification from './authentification';
import Inscription from './inscriptionPage';
import HomePage from './homePage';
import NotificationPage from './notificationPage';
import SettingsPage from './settingsPage';
import ProfilePage from './profilePage';
import AjoutDon from './ajoutDonPage';
import CreationTroc from './creationTroc';
import RechercheTroc from './rechercheTroc';
import RechercheRecevoir from './rechercheRecevoir';
import HistoryPage from './historyPage';

// Components
// import AjoutDon from "./AjoutDonPage";
// import UploadImages from '../elements/images/UploadImages';
// // import Photos from '../elements/images/Photos';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator({ activeRoute }) {
  return (
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
      <Tab.Screen name="AjoutDon" component={AjoutDon} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="RechercheTroc" component={RechercheTroc} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="RechercheRecevoir" component={RechercheRecevoir} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="CreationTroc" component={CreationTroc} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="HistoryPage" component={HistoryPage} options={{ tabBarButton: () => null }} />

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
              <Stack.Screen name="Authentification" component={Authentification} />
              <Stack.Screen name="RechercheTroc" component={RechercheTroc} />
              <Stack.Screen name="AjoutDon" component={AjoutDon} />
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="TabNavigator">
                {(props) => <MainTabNavigator {...props} activeRoute={activeRoute} />}
              </Stack.Screen>
              <Stack.Screen name="ProfilePage" component={ProfilePage} />
              <Stack.Screen name="Inscription" component={Inscription} />
              <Stack.Screen name="RechercheRecevoir" component={RechercheRecevoir} />


              {/* <Stack.Screen name="UploadImages" component={UploadImages} /> */}
              {/* <Stack.Screen name="Photos" component={Photos} /> */}
              <Stack.Screen name="HistoryPage" component={HistoryPage} />
              {/* <Stack.Screen name="rechercheRecevoir" component={rechercheRecevoir} /> */}
              <Stack.Screen name="CreationTroc" component={CreationTroc} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}






