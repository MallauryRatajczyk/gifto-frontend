import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import SelectArticleButton from '../buttons/SelectArticleButton';
import MainButton from '../buttons/MainButton';

const TroquerCard = ({
  visible,
  onClose,
  setPopupVisible,
  setShowTroquerCard,
}) => {
  const handleCTAPress = () => {
    setPopupVisible(true); // Show CompletionCard
    setShowTroquerCard(false); // Hide TroquerCard
  };

  const handleSelectArticlePress = () => {
    console.log('Select Article button clicked!');
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

          <View>
            <SelectArticleButton title="Sac de Lacoste" onPress={handleSelectArticlePress} />
            <SelectArticleButton title="Sac de Lacoste" onPress={handleSelectArticlePress} />
            <SelectArticleButton title="Sac de Lacoste" onPress={handleSelectArticlePress} />
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
