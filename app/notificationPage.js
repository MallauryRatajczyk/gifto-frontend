import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';
import NotificationIcon from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';

export default function SettingsPage() {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.screenMainContainer}>
          
      <HeaderMenu
          icon={NotificationIcon}
          title="Notifications"
          backgroundColor={Colors.yellowColor}
          textColor={Colors.whiteColor}
          iconColor={Colors.whiteColor}
          showBackButton={true}
      />



      <View style={GlobalStyles.container}>
        <MainButton
          title="Historique"
          onPress={() => navigation.navigate('Connection')}
        />
      </View>
      <View style={GlobalStyles.container}>
        <SecondaryButton
          title="Se déconnecter"
          onPress={() => navigation.navigate('Inscription')}
        />
      </View>
    </View>
  );
}
