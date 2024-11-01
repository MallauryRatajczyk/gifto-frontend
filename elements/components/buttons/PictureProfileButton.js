import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { ProfileIcon } from '../../assets/Icons';

export default function PictureProfile({ imageUrl, onPress }) {
  return (
    <TouchableOpacity style={GlobalStyles.PictureProfileContainer} onPress={onPress}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={{ width: 50, height: 50, borderRadius: 25 }} 
        />
      ) : (
        <ProfileIcon width={50} height={50} color={Colors.textColor} />
      )}
      <View style={GlobalStyles.GreyCircleButton} />
    </TouchableOpacity>
  );
}
