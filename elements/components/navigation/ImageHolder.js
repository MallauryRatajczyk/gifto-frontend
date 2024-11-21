import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { ImageHolderIcon } from '../../assets/Icons';

export default function ImageHolder({ onPress }) {
  // Access images from Redux
  const images = useSelector((state) => state.imagesArticles.value.images);

  return (
    <TouchableOpacity
      style={[
        GlobalStyles.ImageHolderContainer,
        { backgroundColor: images && images.length > 0 ? 'transparent' : '#fff' } // White background if no image
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {images && images.length > 0 ? (
        // Render the first image in the array
        <Image
          source={{ uri: "https://benedettiparis.com/cdn/shop/files/S2bd0c9028bc04092bd2dd77189fd2e889.webp?v=1704992154&width=823" }}
          style={{ width: '60%', height: '60%', borderRadius: 10 }}
          resizeMode="cover"
        />
      ) : (
        // Display the icon centered in the white box if there are no images
        <ImageHolderIcon width={70} height={70} color={Colors.lightGreyColor} />
      )}
    </TouchableOpacity>
  );
}
