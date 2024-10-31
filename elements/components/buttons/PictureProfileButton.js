import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { ProfileIcon } from '../../assets/Icons';


export default function PictureProfile() {
  return (
    <View style={GlobalStyles.PictureProfileContainer}>
      <ProfileIcon width={50} height={50} color={Colors.textColor} />
      <TouchableOpacity style={GlobalStyles.GreyCircleButton}/>
    </View>    
  );
  
}

