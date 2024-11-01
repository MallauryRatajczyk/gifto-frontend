import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const ItemCard = ({
  imageSource,
  title,
  description,
  subcategory,
  showSubcategory = false,
}) => {
  return (
    <View style={[GlobalStyles.whiteContainer, styles.cardContainer]}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.imageStyle} />
        {/* Optional Subcategory Tag */}
        {showSubcategory && (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{subcategory}</Text>
          </View>
        )}
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        {/* Title */}
        <Text style={GlobalStyles.subtitleTextBlack}>{title}</Text>
        {/* Description */}
        <Text style={GlobalStyles.smallTextGrey}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // Adjust as needed
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  imageStyle: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.purpleColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tagText: {
    color: Colors.whiteColor,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 14,
  },
  textContainer: {
    padding: 15,
  },
});

export default ItemCard;
