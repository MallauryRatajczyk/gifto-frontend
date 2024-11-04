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

        <View style={GlobalStyles.WelcomeContainer}>
          <PictureProfile
            imageUrl={profileImageUrl}
            onPress={() => navigation.navigate('ProfilePage')}
          />
          <Text style={GlobalStyles.titleTextBlack}>Bonjour {username}!</Text>
        </View>

        <BigCardButton
          icon={DonnerIcon}
          title="Donner"
          bodyText="Donnez vos objets à ceux qui en ont le plus besoin !"
          onPress={() => navigation.navigate('AjoutDon')}
          textColor={Colors.redColor}
          iconColor={Colors.redColor}
        />

        <BigCardButton
          icon={TroquerIcon}
          title="Troquer"
          bodyText="Échangez vos objets pour ce qu'il vous faut !"
          onPress={() => navigation.navigate('RechercheTroc')}
          textColor={Colors.purpleColor}
          iconColor={Colors.purpleColor}
        />

        <BigCardButton
          icon={RecevoirIcon}
          title="Recevoir"
          bodyText="Recevez des objets gratuitement ou en troc !"
          onPress={() => navigation.navigate('RechercheRecevoir')}
          textColor={Colors.greenColor}
          iconColor={Colors.greenColor}
        />

      </View>

    </View>
  );
}



