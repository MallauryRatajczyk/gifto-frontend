import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RetourArrowIcon } from '../../assets/Icons';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';

const BackButton = ({
  iconColor = Colors.purpleColor,
  iconSize = 24,
  style = {},
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack(); 
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[GlobalStyles.backButtonContainer, style]}
      accessible={true}
      accessibilityLabel="Go back"
    >
      <RetourArrowIcon width={iconSize} height={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default BackButton;
