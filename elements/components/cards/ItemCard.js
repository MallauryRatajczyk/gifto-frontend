import React from 'react';
import { View, Text, Image } from 'react-native';
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
    (typeof imageSource === 'number') || // Local image (require)
    (imageSource.uri && imageSource.uri !== '-' && imageSource.uri !== '') // URI-based image
    
  );


  return (
    <View style={GlobalStyles.ItemCardContainer}>

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

        {/* Optional Subcategory Tag */}
        {showSubcategory && subcategory ? (
          <View style={GlobalStyles.TagContainer}>
            <Text style={[GlobalStyles.whiteTinyText, { marginBottom: -8 }, { marginTop: 1}]}>{subcategory}</Text>
          </View>
        ) : null}
      </View>


      {/* Text Container */}
      <View style={GlobalStyles.ItemTextContainer}>
        {/* Title */}
        <Text style={[GlobalStyles.subtitleTextBlack, { marginBottom: -8 }]}>{title}</Text>

        {/* Description */}
        <Text style={GlobalStyles.smallTextGrey}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ItemCard;


/*
USAGE EXAMPLE:

       {/* ItemCard without an image *///}
       //<ItemCard
       // imageSource={{ uri: '-' }}
       // subcategory="Sac"
       // showSubcategory={true}
        //title="Sac de Lacoste"
       // description="This is a description of the item. It is a description of the item. This is a description of the item. This is a description of the item. This is a description of the item. This is a description of the item."
      //  onPress={() => handleItemPress(1)} 
     // />

    //  {/* Spacer */}
     // <View style={{ height: 20 }} />

    //  {/* ItemCard with an image */}
      //<ItemCard
      //  imageSource={TestImage} // Using a local image
      //  subcategory="Accessoires"
    //    showSubcategory={false}
     //   title="Accessoire de Mode"
      //  description="This is another description of the item. It has an image to display. This should show the image correctly in the card. Make sure the image style is applied as expected."
     //   onPress={() => handleItemPress(2)} 
     // />


