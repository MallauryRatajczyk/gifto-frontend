import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Modal, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addImage, removeImage } from '../../reducers/imagesArticles'; // Import Redux actions
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { CameraIcon, GalleryIcon } from '../../assets/Icons'; // Replace with your actual icons
import { Ionicons } from '@expo/vector-icons'; // For default icons

const AddImageCard = () => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Permission Required', 'Camera access is needed to take photos.');
      }

      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus !== 'granted') {
        Alert.alert('Permission Required', 'Media library access is needed to select photos.');
      }
    })();
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const pickImageFromLibrary = async () => {
    closeModal();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Requires Expo SDK 39 or higher
      quality: 1,
    });

    if (!result.cancelled) {
      const images = result.selected ? result.selected : [result];
      const uris = images.map((image) => image.uri);

      setSelectedImages((prevImages) => [...prevImages, ...uris]);
      uris.forEach((uri) => dispatch(addImage(uri)));
    }
  };

  const takePhotoWithCamera = async () => {
    closeModal();
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImages((prevImages) => [...prevImages, result.uri]);
      dispatch(addImage(result.uri));
    }
  };

  const handleRemoveImage = (uri) => {
    setSelectedImages(selectedImages.filter((item) => item !== uri));
    dispatch(removeImage(uri));
  };

  return (
    <View>
      {/* Add Image Card */}
      <TouchableOpacity onPress={openModal} style={styles.addImageCard}>
        <Ionicons name="image-outline" size={100} color="#D3D3D3" />
        <Text style={styles.addImageText}>Ajouter une image</Text>
      </TouchableOpacity>

      {/* Selected Images */}
      <FlatList
        data={selectedImages}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveImage(item)}>
              <Ionicons name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.imagesContainer}
      />

      {/* Modal Popup */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        {/* Dark Overlay */}
        <View style={GlobalStyles.CompletionOverlay}>
          {/* Popup Card */}
          <View style={styles.modalContainer}>
            {/* Title */}
            <Text style={styles.modalTitle}>Ajouter une image</Text>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={pickImageFromLibrary}>
                <GalleryIcon width={50} height={50} color={Colors.primaryColor} />
                <Text style={styles.modalButtonText}>Choisir une photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={takePhotoWithCamera}>
                <CameraIcon width={50} height={50} color={Colors.primaryColor} />
                <Text style={styles.modalButtonText}>Prendre une photo</Text>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addImageCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGreyColor,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  addImageText: {
    fontSize: 16,
    color: Colors.greyColor,
    marginTop: 10,
    fontFamily: 'BalooBhaina2-Regular',
  },
  imagesContainer: {
    paddingVertical: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalContainer: {
    ...GlobalStyles.CompletionContainer,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    ...GlobalStyles.headerTextBlack,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalButtonText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.blackColor,
    fontFamily: 'BalooBhaina2-Regular',
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: 'BalooBhaina2-Regular',
  },
});

export default AddImageCard;
