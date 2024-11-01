import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import PictureProfile from '../elements/components/buttons/PictureProfileButton';
import BigCardButton from '../elements/components/buttons/BigCardButton';
import { TroquerIcon, DonnerIcon, RecevoirIcon } from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';

export default function HomePage() {
  const navigation = useNavigation();
  const profileImageUrl = useSelector((state) => state.user.value.imageUrl);
  const firstName = useSelector((state) => state.user.value.firstName); // Access firstName from Redux

  return (
    <View style={GlobalStyles.screenMainContainer}>
        
      <View style={GlobalStyles.screenHomeContainer}>

        <View style={GlobalStyles.WelcomeContainer}>
          <PictureProfile 
            imageUrl={profileImageUrl}
            onPress={() => navigation.navigate('ProfilePage')}
          />
          {/* <Text style={GlobalStyles.titleTextBlack}>Bonjour {firstName}</Text>*/} 
          <Text style={GlobalStyles.titleTextBlack}>Bonjour {'Amir'}</Text>
        </View>

        <BigCardButton 
          icon={DonnerIcon} 
          title="Donner" 
          bodyText="Donnez vos objets à ceux qui en ont le plus besoin !" 
          onPress={() => navigation.navigate('DonnerPage')}
          textColor={Colors.redColor}
          iconColor={Colors.redColor}
        />

        <BigCardButton 
          icon={TroquerIcon} 
          title="Troquer" 
          bodyText="Échangez vos objets pour ce dont vous avez besoin !" 
          onPress={() => navigation.navigate('TroquerPage')}
          textColor={Colors.purpleColor}
          iconColor={Colors.purpleColor}
        />

        <BigCardButton 
          icon={RecevoirIcon} 
          title="Recevoir" 
          bodyText="Recevez des objets gratuitement ou en troc !" 
          onPress={() => navigation.navigate('rechercheRecevoir')}
          textColor={Colors.greenColor}
          iconColor={Colors.greenColor}
        />
         
      </View>

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