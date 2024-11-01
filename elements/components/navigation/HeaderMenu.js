import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { RetourArrowIcon } from '../../assets/Icons';

export default function HeaderMenu({
  icon: Icon,
  title,
  backgroundColor = Colors.primaryColor,
  textColor = Colors.whiteColor,
  iconColor = Colors.whiteColor,
  showBackButton = false,
}) {
  const navigation = useNavigation();

  return (
    <View style={[GlobalStyles.coloredHeader, { backgroundColor }]}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <RetourArrowIcon width={24} height={24} color={iconColor} />
        </TouchableOpacity>
      )}
      
      {/* Render the icon directly */}
      {Icon && <Icon width={40} height={40} color={iconColor} style={{ marginRight: 10 }} />}
      
      <Text style={[GlobalStyles.headerTextWhite, { color: textColor }]}>{title}</Text>
    </View>
  );
}
