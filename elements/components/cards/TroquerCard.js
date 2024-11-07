import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import MainButton from '../buttons/MainButton';
import SelectArticleButton from '../buttons/SelectArticleButton';

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
const TroquerCard = ({
  visible,
  onClose,
  setPopupVisible,
  setShowTroquerCard,
  itemToExchangeId,
}) => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userToken = useSelector((state) => state.user.value.token);
  console.log('user token', userToken);
// Fetch user's items
useEffect(() => {
  if (!userToken) return;
  
  console.log('Fetching user items with token:', userToken);
  setLoading(true);
  
  fetch(`${BACKEND_ADDRESS}/item/userByToken/myitems`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Full response data:', data);
      if (data.result) {
        setUserItems(data.item || []);
      } else {
        console.error('Error in response:', data.error);
        setUserItems([]);
      }
    })
    .catch(error => {
      console.error('Network error:', error);
      setUserItems([]);
    })
    .finally(() => setLoading(false));
}, [userToken]);
console.log('item', userItems);

const handleSelectArticlePress = (item) => {
  console.log('Selected item:', item);
  setSelectedItem(item);
};

const handleCTAPress = () => {
  if (!selectedItem) {
    console.log('No item selected');
    return;
  }

  console.log('Selected item:', selectedItem);
  console.log('Item to exchange ID:', itemToExchangeId);

  const requestBody = {
    token: userToken,
    possesseur: itemToExchangeId,
    demandeur: selectedItem.proprietaire,
    type: {
      troc: true,
      objetPropose: [selectedItem._id]
    },
    message: [{
      de: selectedItem.proprietaire,
      a: itemToExchangeId,
      message: `Je souhaite échanger mon article ${selectedItem.name}`
    }],
    item: itemToExchangeId,
    statut: 'pending'
  };

  console.log('Sending request body:', requestBody);

  fetch(`${BACKEND_ADDRESS}/demande`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Full exchange response:', data);
      if (data.result) {
        setPopupVisible(true);
        setShowTroquerCard(false);
      } else {
        console.error('Exchange failed:', data.error);
      }
    })
    .catch(error => {
      console.error('Exchange error:', error);
    });
};

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      {/* Dark Overlay */}
      <View style={GlobalStyles.CompletionOverlay}>
        {/* Card */}
        <View style={GlobalStyles.TroquerContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={GlobalStyles.subtitleTextGrey}>X</Text>
          </TouchableOpacity>

          <View style={{ margin: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={GlobalStyles.subtitleTextBlack}>Choisissez les articles que vous souhaitez échanger</Text>
          </View>

          <View style={{ maxHeight: '60%' }}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.purpleColor} />
            ) : (
              userItems.map((item) => (
                <SelectArticleButton
                  key={item._id}
                  title={item.name}
                  onPress={() => handleSelectArticlePress(item)}
                  selected={selectedItem?._id === item._id}
                />
              ))
            )}
          </View>

          <MainButton
            title="Présentez votre offre!"
            onPress={handleCTAPress}
            normalBackgroundColor={Colors.purpleColor}
            clickedBackgroundColor={Colors.textColor}
          />
        </View>
      </View>
    </Modal>
  );
};

export default TroquerCard;
