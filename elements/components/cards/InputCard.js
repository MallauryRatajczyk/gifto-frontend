import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const InputCard = ({
  title,
  onChangeText,
  value,
  placeholder,
  autoComplete,
  keyboardType = 'default',
  textAlign = 'left',
  autoCapitalize = 'none',
  textContentType,
  secureTextEntry = false,
}) => {
  return (
    <View>

      {/* Title on top of the input */}
      <Text style={GlobalStyles.subtitleTextGrey}>{title}</Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={GlobalStyles.whiteFormContainer}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGreyColor}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        textAlign={textAlign}
        autoCapitalize={autoCapitalize}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};


export default InputCard;
