import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';

// Define the mainButton component, receiving "title" as a prop
const mainButton = ({ title, onPress }) => {
    const [isClicked, setIsClicked] = useState(false);
    const handlePress = () => {
        setIsClicked(!isClicked);
        if (onPress) onPress(); // Call the onPress function passed as a prop
      };

  return (
    <TouchableOpacity
      style={[GlobalStyles.buttonPrimary, 
        isClicked && { backgroundColor: Colors.textColor }]}
      onPress={handlePress}
    >
      <Text style={GlobalStyles.buttonTextWhite}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newColor: {
    ...GlobalStyles.buttonPrimary,
    //backgroundColor: Colors.redColor, // to be changed for other colors
  },
});

export default mainButton;
