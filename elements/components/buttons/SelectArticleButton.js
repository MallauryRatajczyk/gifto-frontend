import React, { useState } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';

const SelectArticleButton = ({ 
  title,
  onPress,
  normalBackgroundColor = Colors.whiteColor,
  clickedBackgroundColor = Colors.whiteColor,
  normalStrokeColor = Colors.whiteColor,
  clickedStrokeColor = Colors.purpleColor,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(!isClicked); // Toggle isClicked state
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      style={[
        GlobalStyles.SelectArticleContainer, 
        { 
          backgroundColor: isClicked ? clickedBackgroundColor : normalBackgroundColor,
          borderColor: isClicked ? clickedStrokeColor : normalStrokeColor,
          borderWidth: 2,
        }
      ]}
      onPress={handlePress}
    >
      <Image 
        source={require('../../assets/images/TestImage.jpg')} 
        style={GlobalStyles.ImageSelectContainer} 
      />
      <Text style={[GlobalStyles.subtitleTextBlack, { marginTop: 14 }]}>{title}</Text>
      <View 
        style={[
          GlobalStyles.CheckBox,
          { backgroundColor: isClicked ? Colors.purpleColor : 'transparent' }
        ]}
      />
    </TouchableOpacity>
  );
};

export default SelectArticleButton;


