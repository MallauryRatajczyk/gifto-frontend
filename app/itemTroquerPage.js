import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import Colors from '../elements/styles/Colors';
import ItemHeader from '../elements/components/navigation/ItemHeader';
import { ProfileIcon, FavoriteIcon } from '../elements/assets/Icons';
import TroquerCard from '../elements/components/cards/TroquerCard';
import CompletionCard from '../elements/components/cards/CompletionCard';

const BACKEND_ADDRESS = 'http://192.168.86.114:3000';

export default function ItemTroquerPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const itemId = route.params?.itemId; // Safe access to itemId
  //const itemId = '672103286cc2745bc18a24d7'; // Hardcoded item ID for testing
  const [popupVisible, setPopupVisible] = useState(false);
  const [showTroquerCard, setShowTroquerCard] = useState(false);
  const [itemData, setItemData] = useState(null); 
  const [loading, setLoading] = useState(true);
  console.log(itemId);
  // Fetch item details when component mounts
  useEffect(() => {
    
    if (!itemId) return; // Exit if itemId is undefined
    setLoading(true);
    
    const fetchItemData = async () => {
      fetch(`${BACKEND_ADDRESS}/item/${itemId}`)
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            console.log(data);
            setItemData(data.item); // Assuming the item data is in data.item
          }
        })
    };

    fetchItemData();
    setLoading(false);
  }, [itemId]);
console.log(itemData);
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSubmit = () => {
    setShowTroquerCard(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const closeTroquerCard = () => {
    setShowTroquerCard(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.purpleColor} style={GlobalStyles.loader} />;
  }

  return (
    <View style={GlobalStyles.screenMainContainer}>
      {/* Header */}
      {itemData && (
        <ItemHeader
          showBackButton={true}
          title={itemData.proprietaire.nom} // Owner's name from item data
          backgroundColor={Colors.purpleColor}
          textColor={Colors.whiteColor}
          iconColor={Colors.purpleColor}
          onProfilePress={handleProfilePress}
          profileBackgroundColor={Colors.whiteColor} 
          iconColorProfile={Colors.purpleColor}
        />
      )}

      {/* Content */}
      <View style={[GlobalStyles.screenHomeContainer, { marginTop: -20 }]}>
        <View style={{ flexDirection: 'row' }}>
          <FavoriteIcon width={20} height={20} color={Colors.purpleColor} />
          <Text style={[GlobalStyles.tinyText, { marginLeft: 5, marginTop: 3 }]}>5 personnes ont ajouté cet article à leurs favoris!</Text>
        </View>

        {itemData && (
          <View>
            {/* Main Image */}
            <Image source={{ uri: itemData.image }} style={GlobalStyles.ImageItemContainer} />

            {/* Title */}
            <Text style={GlobalStyles.titleTextBlack}>{itemData.name}</Text>

            {/* Description */}
            <Text style={[GlobalStyles.bodyTextBlack, { marginBottom: 14 }]}>{itemData.description}</Text>

            {/* CTA Button */}
            <MainButton
              title="Faire une offre!"
              onPress={handleSubmit}
              normalBackgroundColor={Colors.purpleColor}
              clickedBackgroundColor={Colors.textColor}
            />
          </View>
        )}

        {/* Show TroquerCard when showTroquerCard is true */}
        {showTroquerCard && (
          <TroquerCard
            visible={showTroquerCard}
            onClose={closeTroquerCard}
            setPopupVisible={setPopupVisible}
            setShowTroquerCard={setShowTroquerCard}
          />
        )}

        {/* Show CompletionCard when popupVisible is true */}
        {popupVisible && (
          <CompletionCard
            visible={popupVisible}
            onClose={closePopup}
            iconColor={Colors.purpleColor}
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
