import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';
import { SettingsIcon } from '../../assets/Icons';


export default function HeaderMenu() {
  return (
    <View style={GlobalStyles.coloredHeader}>
      <SettingsIcon width={40} height={40} color={Colors.whiteColor}/>
      <Text style={GlobalStyles.headerTextWhite}>Paramètres</Text>
    </View>
  );
}
