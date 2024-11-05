import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { ImageHolderIcon } from '../../assets/Icons';

const ItemCard = ({
  imageSource,
  title,
  description,
  subcategory,
  showSubcategory = false,
  onPress,
}) => {
  const hasImage =
    imageSource &&
    (
      (typeof imageSource === 'number') ||
      (imageSource.uri && imageSource.uri !== '-' && imageSource.uri !== '')
    );

  return (
    <TouchableOpacity onPress={onPress} style={GlobalStyles.ItemCardContainer}>
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

        {showSubcategory && subcategory && (
          <View style={GlobalStyles.TagContainer}>
            <Text style={[GlobalStyles.whiteTinyText, { marginBottom: -8 }, { marginTop: 1 }]}>{subcategory}</Text>
          </View>
        )}
      </View>

      <View style={GlobalStyles.ItemTextContainer}>
        <Text style={[GlobalStyles.subtitleTextBlack, { marginBottom: -8 }]}>{title}</Text>
        <Text
          style={GlobalStyles.smallTextGrey}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
