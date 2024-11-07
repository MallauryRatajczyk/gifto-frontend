import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { RetourArrowIcon, SettingsIcon, NotificationIcon, FavoriteIcon, HistoryIcon } from '../../assets/Icons';
import BackButton from '../buttons/BackButton';

export default function HeaderMenu({
  icon: Icon,
  title,
  backgroundColor = Colors.redColor,
  textColor = Colors.whiteColor,
  iconColor = Colors.whiteColor,
  backButtonColor = Colors.textColor,
  showBackButton = false,
}) {
  const navigation = useNavigation();

  return (
    <View style={[GlobalStyles.coloredHeader, { backgroundColor }]}>
      <View style={GlobalStyles.MenuHeaderContainer}>
        {/* Left side - Custom Icon */}
        {Icon && <Icon width={40} height={40} color={iconColor} style={{ marginRight: 10 }} />}
        
        {/* Center - Title */}
        <Text style={[GlobalStyles.headerTextWhite, { color: textColor, flex: 1 }]}>{title}</Text>
        
        {/* Right side - Back Button */}
        {showBackButton && (
          <View style={[GlobalStyles.backContainer, { marginBottom: -40 }]}> 
            <BackButton 
              iconColor={backButtonColor}
              iconSize={24}
              style={{ marginLeft: 10 }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
