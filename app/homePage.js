import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import PictureProfile from '../elements/components/buttons/PictureProfileButton';
import BigCardButton from '../elements/components/buttons/BigCardButton';
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import Colors from '../elements/styles/Colors';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';
import { useSelector } from 'react-redux';

import { SettingsIcon, GiftoLogo } from '../elements/assets/Icons';


export default function HomePage() {
  const navigation = useNavigation();
  const username = useSelector((state) => state.user.value.username);
  return (
    <View style={GlobalStyles.screenMainContainer}>


      <View style={GlobalStyles.WelcomeContainer}>
        <PictureProfile />
        <Text style={GlobalStyles.titleTextBlack}>Bonjour {username}</Text>
      </View>

      <BigCardButton />
      <BigCardButton />
      <BigCardButton />

    </View>
  );
}
/* <View style={GlobalStyles.container}>
   <MainButton
     title="Se connecter" 
     onPress={() => navigation.navigate('Connection')}
   />
 </View>

 <View style={GlobalStyles.container}>
   <SecondaryButton
     title="S’inscrire"
     onPress={() => navigation.navigate('Inscription')}
   />
 </View>*/