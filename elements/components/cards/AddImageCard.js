import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { CameraIcon, ImageHolderIcon, DeleteIcon } from '../../assets/Icons';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import Photos from '../imageHandlers/Photos';
import UploadImages from '../imageHandlers/UploadImages';

const AddImageCard = ({ 
    onImagesChange, 
    existingImages = [], 
    containerStyle = {},
    showTitle = true,
    title = "Ajouter des images",
}) => {
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    // State to control the visibility of Photos.js and UploadImages.js
    const [photosVisible, setPhotosVisible] = useState(false);
    const [uploadImagesVisible, setUploadImagesVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState(existingImages); // State to store selected images

    // Handle image addition from Photos.js and UploadImages.js
    const handleImageAdd = (imageUri) => {
        const updatedImages = [...selectedImages, imageUri];
        setSelectedImages(updatedImages);
        if (onImagesChange) {
            onImagesChange(updatedImages);
        }
    };

    // Handle image removal
    const handleImageRemove = (imageUri) => {
        const updatedImages = selectedImages.filter(uri => uri !== imageUri);
        setSelectedImages(updatedImages);
        if (onImagesChange) {
            onImagesChange(updatedImages);
        }
    };

    return (
        <View>
            {showTitle && (
                <Text style={GlobalStyles.subtitleTextGrey}>{title}</Text>
            )}

            {/* Add Image Card */}
            <TouchableOpacity onPress={() => setOptionsModalVisible(true)} style={GlobalStyles.whiteCardContainer}>
                <ImageHolderIcon width={60} height={60} color={Colors.lightGreyColor} />
                <Text style={[GlobalStyles.subtitleTextLightGrey, { marginTop: 20 }]}>Cliquez pour charger</Text>
            </TouchableOpacity>

            {/* Selected Images (to be style later by AMIR)*/}
            <FlatList
                data={selectedImages}
                horizontal
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item }} style={styles.imagePreview} />
                        <TouchableOpacity style={styles.removeIcon} onPress={() => handleImageRemove(item)}>
                            <DeleteIcon width={20} height={20} color={Colors.redColor} />
                        </TouchableOpacity>
                    </View>
                )}
                style={styles.imagesContainer}
                showsHorizontalScrollIndicator={false}
            />

            {/* Popup Menu */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={optionsModalVisible}
                onRequestClose={() => setOptionsModalVisible(false)}
            >
                <View style={GlobalStyles.CompletionOverlay}>
                    <View style={GlobalStyles.AddPhotoContainer}>

                        <TouchableOpacity 
                            style={GlobalStyles.ModelContainer} 
                            onPress={() => {
                                setPhotosVisible(true);
                                setOptionsModalVisible(false);
                            }}
                        >
                          <View style={GlobalStyles.ModelContainer}>
                            <CameraIcon width={60} height={60} color={Colors.lightGreyColor} />
                            <Text style={[GlobalStyles.subtitleTextLightGrey, { marginTop: 12 }]}>Prendre une photo</Text>
                          </View>

                        </TouchableOpacity>

                        <Text style={GlobalStyles.divider} />

                        <TouchableOpacity 
                            style={GlobalStyles.ModelContainer} 
                            onPress={() => {
                                setUploadImagesVisible(true);
                                setOptionsModalVisible(false);
                            }}
                        >
                          <View style={GlobalStyles.ModelContainer}>
                            <ImageHolderIcon width={60} height={60} color={Colors.lightGreyColor} />
                            <Text style={[GlobalStyles.subtitleTextLightGrey, { marginTop: 12 }]}>Choisir depuis la galerie</Text>
                          </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setOptionsModalVisible(false)}>
                            <Text style={GlobalStyles.subtitleTextRed}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Photos Component */}
            <Photos
                visible={photosVisible}
                onClose={() => setPhotosVisible(false)}
                onImageAdd={handleImageAdd}
            />

            {/* UploadImages Component */}
            <UploadImages
                visible={uploadImagesVisible}
                onClose={() => setUploadImagesVisible(false)}
                onImageAdd={handleImageAdd}
            />
        </View>
    );
};

export default AddImageCard;

const styles = StyleSheet.create({

    imagesContainer: {
        flexDirection: 'row',
        marginVertical: 10,
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
        top: 5,
        right: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
    },

});
