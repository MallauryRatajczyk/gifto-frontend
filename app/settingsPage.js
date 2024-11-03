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


import TestImage from '../elements/assets/images/TestImage.jpg';




//REMARQUE : NOUS DEVONS METTRE À JOUR LES LIENS DU BOUTON CERCLE !!!!!!!
//Changer la direction du point de terminaison du bouton Historique

export default function SettingsPage() {
  const navigation = useNavigation();


  return (
    <View style={GlobalStyles.appStyle}>

      <HeaderMenu />



      <View style={GlobalStyles.screenHomeContainer}>

    {/* AMIR IS TESTING HERE */}

       {/* ItemCard without an image */}
       <ItemCard
        imageSource={{ uri: '-' }}
        subcategory="Sac"
        showSubcategory={true}
        title="Sac de Lacoste"
        description="This is a description of the item. It is a description of the item. This is a description of the item. This is a description of the item. This is a description of the item. This is a description of the item."
        onPress={() => handleItemPress(1)} 
      />

      {/* Spacer */}
      <View style={{ height: 20 }} />

      {/* ItemCard with an image */}
      <ItemCard
        imageSource={TestImage} // Using a local image
        subcategory="Accessoires"
        showSubcategory={true}
        title="Accessoire de Mode"
        description="This is another description of the item. It has an image to display. This should show the image correctly in the card. Make sure the image style is applied as expected."
        onPress={() => handleItemPress(2)} 
      />

    {/* TESTING FINISHED */}

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
