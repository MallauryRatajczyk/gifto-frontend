import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import DescriptionCard from './DescriptionCard';
import MainButton from '../buttons/MainButton';

const ExplainCard = ({
    visible,
    onClose,
    setPopupVisible,
    setShowExplainCard,
  }) => {
    const [description, setDescription] = useState(''); // State for description

    const handleCTAPress = () => {
      setPopupVisible(true); // Show CompletionCard
      setShowExplainCard(false); // Hide ExplainCard
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
            <Text style={GlobalStyles.subtitleTextBlack}>Expliquez votre besoin!</Text>
          </View>

          {/* Description */}
          <DescriptionCard
            value={description}
            onChangeText={setDescription}
            showTitle={false}
            placeholderTextColor={Colors.lightGreyColor}
            inputStyle={{ backgroundColor: Colors.whiteColor }}
          />
          
          {/* CTA Button */}
          <MainButton
            title="Envoyez!"
            onPress={handleCTAPress}
            normalBackgroundColor={Colors.greenColor}
            clickedBackgroundColor={Colors.textColor}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ExplainCard;
