import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import CircleButton from '../elements/components/buttons/CircleButton';
import { ShareIcon, MuteIcon, StarIcon } from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';
import ItemCard from '../elements/components/cards/ItemCard';






//REMARQUE : NOUS DEVONS METTRE À JOUR LES LIENS DU BOUTON CERCLE !!!!!!!
//Changer la direction du point de terminaison du bouton Historique

export default function SettingsPage() {
  const navigation = useNavigation();


  return (
    <View style={GlobalStyles.screenMainContainer}>

    {/* AMIR IS TESTING HERE */}
      <HeaderMenu />


      <ItemCard
        imageSource={{ uri: '-' }}
        title="Sac de Lacoste"
        description="This is a description of the item."
        subcategory="Lorem ipsum dolor sit amet"
        showSubcategory={true}
      />

    {/* TESTING FINISHED */}


      <View style={GlobalStyles.screenHomeContainer}>

        <MainButton
            title="Historique"
            onPress={() => navigation.navigate('Connection')}
            normalBackgroundColor={Colors.textColor}
            clickedBackgroundColor={Colors.purpleColor}    // Clicked state background color
          />

        <SecondaryButton
            title="Se déconnecter"
            onPress={() => navigation.navigate('Authentification')}
            normalBackgroundColor={Colors.backgroundColor}
            clickedBackgroundColor={Colors.textColor}    // Clicked state background color
            normalStrokeColor={Colors.textColor}
            clickedStrokeColor={Colors.textColor}        // Clicked state stroke color
            normalTextColorStyle={GlobalStyles.buttonTextBlack}
            clickedTextColorStyle={GlobalStyles.buttonTextWhite}  // Clicked state text color
          />

        <View style={GlobalStyles.LoginIconsContainer}>

          {/* Button to Rate our application on the App Store */}
          <View style={GlobalStyles.CircleButtonTextContainer}>
            <CircleButton
                icon={StarIcon}
                onPress={() => {promptAsync();}}
                normalBackgroundColor={Colors.backgroundColor}
                clickedBackgroundColor={Colors.purpleColor}
                normalStrokeColor={Colors.shadow}
                clickedStrokeColor={Colors.purpleColor}
                normalIconColor={Colors.purpleColor}
                clickedIconColor={Colors.whiteColor}
            />
            <Text style={GlobalStyles.bodyTextComments}>Évaluez-nous</Text>
          </View>

          {/* Button to share our application from the app store */}
          <View style={GlobalStyles.CircleButtonTextContainer}>
            <CircleButton
              icon={ShareIcon}
              onPress={() => {promptAsync();}}
              normalBackgroundColor={Colors.backgroundColor}
              clickedBackgroundColor={Colors.purpleColor}
              normalStrokeColor={Colors.shadow}
              clickedStrokeColor={Colors.purpleColor}
              normalIconColor={Colors.purpleColor}
              clickedIconColor={Colors.whiteColor}
            />
          <Text style={GlobalStyles.bodyTextComments}>Partagez notre application</Text>
          </View>

          {/* Button to stop notifications (connected to the settings page) */}
          <View style={GlobalStyles.CircleButtonTextContainer}>

            <CircleButton
                icon={MuteIcon}
                onPress={() => {promptAsync();}}
                normalBackgroundColor={Colors.backgroundColor}
                clickedBackgroundColor={Colors.purpleColor}
                normalStrokeColor={Colors.shadow}
                clickedStrokeColor={Colors.purpleColor}
                normalIconColor={Colors.purpleColor}
                clickedIconColor={Colors.whiteColor}
            />
            <Text style={GlobalStyles.bodyTextComments}>Enlever notif</Text>

          </View>

          </View>

      </View>

    </View>
  );
}
