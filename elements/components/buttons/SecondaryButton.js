import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
        GlobalStyles.buttonSecondary, 
        { 
          backgroundColor: isClicked ? clickedBackgroundColor : normalBackgroundColor,
          borderColor: isClicked ? clickedStrokeColor : normalStrokeColor,
          borderWidth: 2,
        }
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={isClicked ? clickedTextColorStyle : normalTextColorStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default secondaryButton;
