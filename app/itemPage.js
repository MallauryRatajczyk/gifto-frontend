import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import PictureProfile from '../elements/components/buttons/PictureProfileButton';
import BigCardButton from '../elements/components/buttons/BigCardButton';
import { TroquerIcon, DonnerIcon, RecevoirIcon } from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';
import { SettingsIcon, GiftoLogo } from '../elements/assets/Icons';

import { TouchableOpacity, Image } from 'react-native';

export default function HomePage() {
  const navigation = useNavigation();
  const profileImageUrl = useSelector((state) => state.user.value.imageUrl);
  //const firstName = useSelector((state) => state.user.value.firstName); // Access firstName from Redux
  const username = useSelector((state) => state.user.value.username);
  return (
    <View style={GlobalStyles.screenMainContainer}>

      <View style={GlobalStyles.screenHomeContainer}>

 

      </View>

    </View>
  );
}



