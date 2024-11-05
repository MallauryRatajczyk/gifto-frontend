import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { LocationIcon, RetourArrowIcon } from '../../assets/Icons';
import PictureProfile from '../buttons/PictureProfileButton'; 
import BackButton from '../buttons/BackButton';

export default function ItemHeader({
    title,
    subtitle,
    backgroundColor = Colors.purpleColor,
    textColor = Colors.whiteColor,
    iconColor = Colors.whiteColor,
    profileImageUrl, // URL for profile picture
    onProfilePress,  // Function to handle profile button press

    profileBackgroundColor = Colors.shadow, 
    CustomIcon, 
    iconColorProfile = Colors.textColor, 
  }) {
    return (
      <View style={[GlobalStyles.coloredHeader, { backgroundColor }]}>
        
        <View style={GlobalStyles.profileHeaderContainer}>
          {/* Left Section: Profile Button */}
          <PictureProfile
              imageUrl={profileImageUrl}
              onPress={onProfilePress}
              backgroundColor={profileBackgroundColor} // Custom background color
              CustomIcon={CustomIcon} // Custom icon component
              iconColor={iconColorProfile} // Custom icon color

            />

            {/* Center Section: Title and Subtitle */}
            <View >
              <Text style={[GlobalStyles.titleTextWhite, { color: textColor }]}>
                {title}
              </Text>
              {subtitle && (
                <View style={[GlobalStyles.locationContainer, { marginTop: -12 }]}>
                  <LocationIcon width={16} height={16} color={Colors.whiteColor} />
                  <Text style={[GlobalStyles.miniTitleTextWhite, 
                    { color: Colors.whiteColor, marginLeft: 4, marginTop: 2 }]}>
                    {subtitle}
                  </Text>
                </View>
              )}
            </View>
          
        </View>


        {/* Right Section: Back Button */}
        <View style={GlobalStyles.backContainer}> 
        <BackButton iconColor={iconColor}/>
        </View>



      </View>
    );
  }