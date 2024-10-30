import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';

// Define the secondaryButton component, receiving "title" as a prop
const secondaryButton = ({ title, onPress }) => {
    const [isClicked, setIsClicked] = useState(false);
    const handlePress = () => {
        setIsClicked(!isClicked);
        if (onPress) onPress(); // Call the onPress function passed as a prop
      };

  return (
    <TouchableOpacity
      style={[GlobalStyles.buttonSecondary, 
        isClicked && { backgroundColor: Colors.redColor }]}
      onPress={handlePress}
    >
      <Text style={[GlobalStyles.buttonTextRed, 
        isClicked && { color: Colors.whiteColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newColor: {
    ...GlobalStyles.buttonSecondary,
    //backgroundColor: Colors.redColor, // to be changed for other colors
  },
});

export default secondaryButton;
