import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';
import { DonnerIcon, TroquerIcon, RecevoirIcon } from '../../assets/Icons';


export default function BigCardButton() {
  return (
    <View style={GlobalStyles.whiteCardContainer}>

      <View style={GlobalStyles.CardTextContainer}>
        <Text style={GlobalStyles.headerTextRed}>Donner</Text>
        <Text style={GlobalStyles.bodyTextBlack}>Donnez vos objets à ceux qui en ont le plus besoin !</Text>
      </View>

      <DonnerIcon width={70} height={70} color={Colors.redColor}/>

    </View>    
  );
  
}

