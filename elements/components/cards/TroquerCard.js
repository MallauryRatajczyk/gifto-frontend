import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import MainButton from '../buttons/MainButton';
import SelectArticleButton from '../buttons/SelectArticleButton';

const BACKEND_ADDRESS = 'http://192.168.86.114:3000';
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

// Fetch user's items
useEffect(() => {
  console.log('Fetching user items...');
  setLoading(true);
  fetch(`${BACKEND_ADDRESS}/item/user/${userToken}`, {
    headers: {
      'Authorization': `Bearer ${userToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        console.log('User items response:', data);
        setUserItems(data.item);
      }
    })
    .finally(() => setLoading(false));
}, [userToken]);


const handleSelectArticlePress = (item) => {
  setSelectedItem(item);
};

const handleCTAPress = () => {
  if (!selectedItem) return;

  fetch(`${BACKEND_ADDRESS}/demande`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      token: userToken,
      demandeur: selectedItem.proprietaire, // ID of user making the request
      possesseur: itemToExchangeId, // ID of item owner
      item: itemToExchangeId, // ID of requested item
      type: 'exchange',
      message: `Je souhaite échanger mon article ${selectedItem.name}`
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Exchange response:', data);
      if (data.result) {
        setPopupVisible(true);
        setShowTroquerCard(false);
      }
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
