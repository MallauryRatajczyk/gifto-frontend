import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RetourArrowIcon } from '../../assets/Icons';

const BackButton = ({
  iconColor = '#000',
  iconSize = 24,
  style = {},
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Custom onPress function if provided
    } else {
      navigation.goBack(); // Default back action
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, style]}>
      <RetourArrowIcon width={iconSize} height={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5, // Adjust padding as needed
  },
});

export default BackButton;
