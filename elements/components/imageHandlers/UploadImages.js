import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { useDispatch } from "react-redux";
import { addImage } from "../../../reducers/imagesArticles";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function UploadImages({ onImageAdd, onClose, visible }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (visible && isFocused) {
            openGallery(); 
        }
    }, [visible, isFocused]);

    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
        } else {
            Alert.alert("No Image Selected", "Vous n'avez pas sélectionné d'image.");
            onClose(); 
        }
    };

    const uploadImage = (imageUri) => {
        const data = new FormData();
        data.append("photoFromFront", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg",
        });

        fetch(`${BACKEND_ADDRESS}/upload`, {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    dispatch(addImage(data.url));
                    onImageAdd(data.url);
                    onClose(); // Close after successful upload
                } else {
                    Alert.alert("Upload Failed", "Échec du téléchargement de l'image.");
                }
            })
            .catch((error) => {
                Alert.alert("Error", `Erreur lors de l'envoi de l'image: ${error.message}`);
            });
    };

    return <View />; // New: Empty view as nothing needs to render
}
