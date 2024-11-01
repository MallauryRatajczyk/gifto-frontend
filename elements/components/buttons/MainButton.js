import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
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

  const handlePressIn = () => {
    setIsClicked(true); // Set isClicked to true when the button is pressed down
  };

  const handlePressOut = () => {
    setIsClicked(false); // Reset isClicked to false when the press is released
    if (onPress) onPress(); // Call the onPress function after the press is released
  };

  return (
    <TouchableOpacity
      style={[
        GlobalStyles.buttonPrimary, 
        { 
          backgroundColor: isClicked ? clickedBackgroundColor : normalBackgroundColor
        } // Use prop color if clicked
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={normalTextColorStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default mainButton;
