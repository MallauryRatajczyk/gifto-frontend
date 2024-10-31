import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';

const mainButton = ({ 
  title,
  onPress,
  normalBackgroundColor = Colors.purpleColor,
  normalTextColorStyle = GlobalStyles.buttonTextWhite,
  clickedBackgroundColor = Colors.textColor
  }) => {
    const [isClicked, setIsClicked] = useState(false);
    const handlePress = () => {
        setIsClicked(!isClicked);
        if (onPress) onPress(); // Call the onPress function passed as a prop
      };

  return (
    <TouchableOpacity
      style={[GlobalStyles.buttonPrimary, 
        { 
          backgroundColor: isClicked ? clickedBackgroundColor : normalBackgroundColor
         } // use prop color if clicked
      ]}
      onPress={handlePress}
    >
      <Text style={normalTextColorStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};



export default mainButton;

