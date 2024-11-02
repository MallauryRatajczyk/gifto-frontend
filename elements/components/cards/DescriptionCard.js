import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const DescriptionCard = ({
  title = 'Description d’article',
  placeholder = 'Écrivez votre description ici...',
  placeholderTextColor = Colors.lightGreyColor,
  textAlign = 'left',
  value,
  onChangeText,
  containerStyle = {},
  inputStyle = {},
  showTitle = true,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      {/* Conditionally render the title */}
      {showTitle && (<Text style={GlobalStyles.subtitleTextGrey}>{title}</Text>)}

      {/* Input box*/}
      <TextInput
        style={[GlobalStyles.descriptionFormContainer, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        textAlign={textAlign}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top" // Ensures text starts at the top for multiline TextInput
        {...props}
      />
    </View>
  );
};

export default DescriptionCard;
