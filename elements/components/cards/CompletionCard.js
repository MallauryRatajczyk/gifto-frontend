import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { RocketIcon } from '../../assets/Icons';

const CompletionCard = ({
  visible,
  onClose,
  iconColor = Colors.purpleColor,
  title = 'Completion!',
  navigation,
  navigateTo = 'NextScreen',    
  duration = 2000, 
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
        if (navigation && navigateTo) {
          navigation.navigate(navigateTo);
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dark Overlay */}
      <View style={GlobalStyles.CompletionOverlay}>
        {/* Card */}
        <View style={GlobalStyles.CompletionContainer}>
          {/* Icon */}
          <RocketIcon width={90} height={90} color={iconColor} />
          {/* Title */}
          <View style= {{margin: 10, alignItems: 'center'}}>
          <Text style={[GlobalStyles.headerTextBlack, { color: iconColor }]}>Wohoo!</Text>
          <Text style={[GlobalStyles.titleTextBlack, { marginVertical: -14 }]}>{title}</Text>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default CompletionCard;

/*
USAGE:

import React, { useState } from 'react';
import CompletionCard  from '../elements/components/cards/CompletionCard';

inside the function: 

const BlaBlaBla = () => {

  const navigation = useNavigation();
  //popup page state
  const [popupVisible, setPopupVisible] = useState(false);
  const handleAction = () => {
    setPopupVisible(true);
  };
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (

  <View>
  
        //{/* Validation Button *///}
        //<MainButton
       // title="Valider!"
       // onPress={handleAction}
       // normalBackgroundColor={Colors.redColor}
      //  clickedBackgroundColor={Colors.textColor} 
      //>

  //{/* Completion Popup */}
  //<CompletionCard
   // visible={popupVisible}
  //  onClose={closePopup}
   // iconColor={Colors.redColor} // Customize icon color
   // title="Opération Validée." // Customize title
   // navigation={navigation}
   // navigateTo="Home" 
  //  duration={2000} 
  ///>
  
  
  //</View>
  
 // );