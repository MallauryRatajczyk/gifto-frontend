
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import Icon from '../../assets/Icons'; 

const CircleButton = ({
  icon: IconComponent,
  onPress,
  normalBackgroundColor = Colors.backgroundColor,
  clickedBackgroundColor = Colors.redColor,
  normalStrokeColor = Colors.redColor,
  clickedStrokeColor = Colors.redColor,
  normalIconColor = Colors.redColor,
  clickedIconColor = Colors.redColor,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  // Event handler when the button is pressed down
  const handlePressIn = () => {
    setIsClicked(true);
  };

  // Event handler when the button press is released
  const handlePressOut = () => {
    setIsClicked(false);
    if (onPress) onPress(); // Call the onPress function after the press is released
  };

  return (
    <TouchableOpacity
      style={[
        GlobalStyles.circleButton,
        {
          backgroundColor: isClicked ? clickedBackgroundColor : normalBackgroundColor,
          borderColor: isClicked ? clickedStrokeColor : normalStrokeColor,
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {IconComponent && (
        <IconComponent
          width={38}
          height={38}
          color={isClicked ? clickedIconColor : normalIconColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default CircleButton;
