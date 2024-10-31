import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
const secondaryButton = ({ 
  title,
  onPress,
  normalBackgroundColor = Colors.backgroundColor,
  clickedBackgroundColor = Colors.redColor,
  normalStrokeColor = Colors.redColor,
  clickedStrokeColor = Colors.redColor,
  normalTextColorStyle = GlobalStyles.buttonTextRed,
  clickedTextColorStyle = GlobalStyles.buttonTextWhite,
  }) => {
    const [isClicked, setIsClicked] = useState(false);
    const handlePress = () => {
        setIsClicked(!isClicked);
        if (onPress) onPress(); // Call the onPress function passed as a prop
      };

  return (
    <TouchableOpacity
      style={[GlobalStyles.buttonSecondary, 
        { 
          backgroundColor: isClicked ? clickedBackgroundColor : normalBackgroundColor,
          borderColor: isClicked ? clickedStrokeColor : normalStrokeColor,
          borderWidth: 2,
         } // use prop color if clicked
      ]}
      onPress={handlePress}
    >
      <Text style={isClicked ? clickedTextColorStyle : normalTextColorStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};



export default secondaryButton;
