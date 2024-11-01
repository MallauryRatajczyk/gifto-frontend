//yarn add @react-navigation/native @react-navigation/bottom-tabs

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeIcon, NotificationIcon, SettingsIcon } from '../../assets/Icons';
import Colors from '../../styles/Colors';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';

function NavigationBar(props) {
    console.log(props.descriptors.options);
  const navigation = useNavigation();
  const route = useRoute();

  const getIconColor = (screenName) => (
    props.activeRoute === screenName ? Colors.purpleColor : Colors.textColor
  );
  

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={[GlobalStyles.navigatorContainer]}>
      <View style={[GlobalStyles.navigatorInnerContainer]}>   
        <TouchableOpacity 
          style={GlobalStyles.iconContainer} 
          onPress={() => handleNavigation('Notification')}>
          <NotificationIcon width={24} height={24} color={getIconColor('Notification')} />
          <Text style={[GlobalStyles.iconText, { color: getIconColor('Notification') }]}>
            Notification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={GlobalStyles.iconContainer} 
          onPress={() => handleNavigation('Home')}>
          <HomeIcon width={24} height={24} color={getIconColor('Home')} />
          <Text style={[GlobalStyles.iconText, { color: getIconColor('Home') }]}>
            Accueil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={GlobalStyles.iconContainer} 
          onPress={() => handleNavigation('Settings')}>
          <SettingsIcon width={24} height={24} color={getIconColor('Settings')} />
          <Text style={[GlobalStyles.iconText, { color: getIconColor('Settings') }]}>
            Paramètres
          </Text>
        </TouchableOpacity>
        
      </View>

    </View>
  );
}


export default NavigationBar;

