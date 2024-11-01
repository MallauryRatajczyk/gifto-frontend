import React from 'react';
import { View, Text, TextInput } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const PasswordInputCard = ({
  title,
  onChangeText,
  value,
  placeholder,
  autoComplete = 'current-password',
  keyboardType = 'default',
  textAlign = 'left',
  autoCapitalize = 'none',
  textContentType = 'password',
  secureTextEntry = true,
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

export default PasswordInputCard;
