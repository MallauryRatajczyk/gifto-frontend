import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import Colors from '../elements/styles/Colors';
import ItemHeader from '../elements/components/navigation/ItemHeader';
import { ProfileIcon, FavoriteIcon } from '../elements/assets/Icons';
import ExplainCard from '../elements/components/cards/ExplainCard'; // Popup explaining page
import CompletionCard from '../elements/components/cards/CompletionCard'; // Completion popup

export default function ItemRecevoirPage() {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false); // CompletionCard visibility
  const [showExplainCard, setShowExplainCard] = useState(false); // ExplainCard visibility

const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSubmit = () => {
    setShowExplainCard(true); // Show ExplainCard popup
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const closeExplainCard = () => {
    setShowExplainCard(false);
  };

  return (
    <View style={GlobalStyles.screenMainContainer}>
      {/* Header */}
      <ItemHeader
        showBackButton={true}
        title="Amir La Capsule"
        subtitle="Paris, France"
        backgroundColor={Colors.greenColor}
        textColor={Colors.whiteColor}
        iconColor={Colors.greenColor}
        onProfilePress={handleProfilePress}
        profileBackgroundColor={Colors.whiteColor} 
        iconColorProfile={Colors.greenColor}
      />

      {/* Content */}
      <View style={[GlobalStyles.screenHomeContainer, { marginTop: -20 }]}>
        <View style={{ flexDirection: 'row' }}>
          <FavoriteIcon width={20} height={20} color={Colors.greenColor} />
          <Text style={[GlobalStyles.tinyText, { marginLeft: 5, marginTop: 3 }]}>5 personnes ont ajouté cet article à leurs favoris!</Text>
        </View>

        <View>
          {/* Main Image */}
          <Image source={require('../elements/assets/images/TestImage.jpg')} style={GlobalStyles.ImageItemContainer} />

          {/* Title */}
          <Text style={GlobalStyles.titleTextBlack}>Sac de Lacoste</Text>

          {/* Description */}
          <Text style={[GlobalStyles.bodyTextBlack, { marginBottom: 14 }]}>Lorem ipsum molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! repudiandae consequuntur voluptatum laborum numquam eaque rerum!</Text>

          {/* CTA Button */}
          <MainButton
            title="Demander!"
            onPress={handleSubmit}
            normalBackgroundColor={Colors.greenColor}
            clickedBackgroundColor={Colors.textColor}
          />
        </View>

        {/* Show ExplainCard when showExplainCard is true */}
        {showExplainCard && (
          <ExplainCard
            visible={showExplainCard}
            onClose={closeExplainCard}
            iconColor={Colors.greenColor}
            setPopupVisible={setPopupVisible} // Pass setPopupVisible to manage CompletionCard visibility
            setShowExplainCard={setShowExplainCard} // Pass setShowExplainCard to hide ExplainCard
          />
        )}

        {/* Show CompletionCard when popupVisible is true */}
        {popupVisible && (
          <CompletionCard
            visible={popupVisible}
            onClose={closePopup}
            iconColor={Colors.greenColor}
            title="Opération Validée."
            navigation={navigation}
            navigateTo="Home"
            duration={2000}
          />
        )}
      </View>
    </View>
  );
}
