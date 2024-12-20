import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';
import { NotificationIcon } from '../../assets/Icons';


export default function NotificationHeader() {
  return (
    <View style={GlobalStyles.coloredHeader}>
      <NotificationIcon width={40} height={40} color={Colors.whiteColor} />
      <Text style={GlobalStyles.headerTextWhite}>Notifications</Text>
    </View>
  );
}
