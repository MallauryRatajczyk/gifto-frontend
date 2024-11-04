import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { ImageHolderIcon, EditIcon } from '../../assets/Icons';

const ItemCard = ({
  imageSource,
  title,
  description,
  onPress,
  onEditPress, // Ensure this prop is passed
}) => {
  const hasImage =
    imageSource &&
    (
      typeof imageSource === 'number' || // Local image (require)
      (imageSource.uri && imageSource.uri !== '-' && imageSource.uri !== '') // URI-based image
    );

  return (
    <TouchableOpacity
      style={GlobalStyles.ItemCardContainer}
      onPress={onPress}
    >
      
      {/* Edit Icon */}
      <TouchableOpacity
        style={GlobalStyles.editIcon}
        onPress={onEditPress}
        accessible={true}
        accessibilityLabel="Edit item"
      >
        <EditIcon width={24} height={24} color={Colors.lightGreyColor} />

      </TouchableOpacity>

      {/* Image Container */}
      <View style={GlobalStyles.ImageTagContainer}>
        <View
          style={[
            GlobalStyles.MiniImageHolderContainer,
            { backgroundColor: hasImage ? 'transparent' : Colors.superLightGreyColor },
          ]}
        >
          {hasImage ? (
            <Image
              source={imageSource}
              style={GlobalStyles.ImageStyle}
              resizeMode="cover"
            />
          ) : (
            <ImageHolderIcon width={35} height={35} color={Colors.lightGreyColor} />
          )}
        </View>
      </View>

      {/* Text Container */}
      <View style={GlobalStyles.ItemTextContainer}>
        {/* Title */}
        <Text style={GlobalStyles.subtitleTextBlack}>
          {title}
        </Text>

        {/* Description */}
        <Text
          style={GlobalStyles.smallTextGrey}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>

      {/* Bottom Right Text */}
      <View style={GlobalStyles.bottomUpdateContainer}>
        <Text style={GlobalStyles.redSubtitleText}>Le demande en cours</Text>
      </View>
      
    </TouchableOpacity>
  );
};

export default ItemCard;
