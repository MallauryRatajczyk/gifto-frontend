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
// import AjoutDon from "./ajoutDonPage";
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import imagesArticles from '../reducers/imagesArticles.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//IMPORTER LES REDUCERS Exemple:
const reducers = combineReducers({ user, imagesArticles });
const persistConfig = { key: 'gifto', storage };
// const persistConfig = {            // utilisation de AsynStorage de redux persist pour react native
//   key: 'gifto',
//   storage: AsyncStorage,
// };

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
            {/* <Stack.Screen name="AjoutDon" component={AjoutDon} /> */}
            <Stack.Screen name="Authentification" component={Authentification} />
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

/*


import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

import * as Font from 'expo-font';
import { BalooBhaijaan2_400Regular, BalooBhaijaan2_500Medium,BalooBhaijaan2_600SemiBold, BalooBhaijaan2_700Bold } from '@expo-google-fonts/baloo-bhaijaan-2';
import GlobalStyles from '../elements/styles/GlobalStyles'; 
import Colors from '../elements/styles/Colors'; 
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import BigCardButton from '../elements/components/buttons/BigCardButton';

import { GiftIcon, ReceiveIcon, ExchangeIcon } from '../elements/assets/Icons';




export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();

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



  return (
    <View style={GlobalStyles.screenMainContainer}>

    <View style={GlobalStyles.container}>
      <MainButton 
        title="Se connecter"
        onPress={() => 
          navigation.navigate('TargetPage')} 
      />
      </View>

      

    <View style={GlobalStyles.container}>
      <SecondaryButton 
        title="S’inscrire"
        onPress={() => 
          navigation.navigate('TargetPage')} 
      />
    </View>


      <GiftIcon width={50} height={50} color={Colors.purpleColor} />


      <View style={GlobalStyles.buttonSecondary}>
      <Text style={GlobalStyles.buttonTextRed}>Se connecter</Text>
      
      </View>



    </View>
  );
}

*/