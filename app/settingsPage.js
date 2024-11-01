import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import Colors from '../elements/styles/Colors';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';

export default function SettingsPage() {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.screenMainContainer}>

      <HeaderMenu/>
      <View>
        <MainButton
          title="Historique" 
          onPress={() => navigation.navigate('Connection')}
          normalBackgroundColor={Colors.redColor} 
          clickedBackgroundColor={Colors.greenColor}    // Clicked state background color
        />
      </View>

      <View>
        <SecondaryButton 
          title="Se déconnecter" 
          onPress={() => navigation.navigate('Inscription')}
          normalBackgroundColor={Colors.backgroundColor} 
          clickedBackgroundColor={Colors.textColor}    // Clicked state background color
          normalStrokeColor={Colors.textColor}        
          clickedStrokeColor={Colors.textColor}        // Clicked state stroke color
          normalTextColorStyle={GlobalStyles.buttonTextBlack}
          clickedTextColorStyle={GlobalStyles.buttonTextWhite}  // Clicked state text color
        />
      </View>
    </View>
  );
}
