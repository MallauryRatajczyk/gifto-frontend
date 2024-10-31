import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';


export default function SettingsPage() {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.screenMainContainer}>


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
