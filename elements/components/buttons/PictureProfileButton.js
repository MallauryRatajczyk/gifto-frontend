import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { ProfileIcon } from '../../assets/Icons';

export default function PictureProfile({ 
  imageUrl, 
  onPress,
  backgroundColor = Colors.shadow, 
  CustomIcon, 
  iconColor = Colors.textColor, 
}) {

  return (
    <TouchableOpacity 
      style={[
        GlobalStyles.PictureProfileContainer, 
        { backgroundColor } 
      ]} 
      onPress={onPress}
      accessible={true}
      accessibilityLabel="Profile"
    >
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.profileImage} 
        />
      ) : (
        CustomIcon ? (
          <CustomIcon width={50} height={50} color={iconColor} />
        ) : (
          <ProfileIcon width={50} height={50} color={iconColor} />
        )
      )}
      <View style={GlobalStyles.GreyCircleButton} />
    </TouchableOpacity>
  );
}
