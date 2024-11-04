import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Modal, Text, Alert } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { useDispatch } from "react-redux";
import { addImage, removeImage } from "../../../reducers/imagesArticles";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // for on camera icons 

const BACKEND_ADDRESS = "http://192.168.1.182:3000";        

export default function Photos({ visible, onClose, onImageAdd }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    let cameraRef = useRef(null);

    // Request camera permissions on component mount
    useEffect(() => {
        (async () => {
            const result = await Camera.requestCameraPermissionsAsync();
            if (result) {
                setHasPermission(result.status === "granted");
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
            const formData = new FormData();
            const uri = photo.uri;

            // Prepare form data for upload
            formData.append("photoFromFront", {
                uri: uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });

            fetch(`${BACKEND_ADDRESS}/upload`, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        dispatch(addImage(data.url)); // Mise à jour du Redux
                        onImageAdd(data.url); // Envoi de l'image au composant parent
                        onClose(); // Fermeture de la caméra
                    } else {
                        console.error("Erreur : le serveur n'a pas retourné un résultat valide.");
                        Alert.alert("Upload Failed", "Server did not return a valid result.");
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la prise ou de l'envoi de la photo :", error);
                    Alert.alert("Error", "Error taking or uploading photo");
                });
        }
    };

    // If no permission or the screen is not focused, render nothing. Otherwise, render the camera
    if (!hasPermission || !isFocused) {
        return <View />;
    }

    return (
        <Modal onRequestClose={onClose} visible={visible} animationType="slide" transparent={false}>
            <Camera
                style={styles.fullScreenCamera}
                type={type}
                flashMode={flashMode}
                ref={(ref) => (cameraRef.current = ref)}
            >
                <View style={styles.cameraOverlay}>

                    {/* Top Control Buttons */}
                    <View style={styles.topButtonsContainer}>

                        {/* Switch Camera Type */}
                        <TouchableOpacity 
                            onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} 
                            style={styles.button}
                        >
                            <FontAwesome name="rotate-right" size={25} color="#ffffff" />
                        </TouchableOpacity>

                        {/* Toggle Flash Mode */}
                        <TouchableOpacity 
                            onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)} 
                            style={styles.button}
                        >
                            <FontAwesome name="flash" size={25} color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"} />
                        </TouchableOpacity>

                        {/* Close Camera button */}
                        <TouchableOpacity onPress={onClose} style={styles.cameraControlButton}>
                            <FontAwesome name="close" size={25} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                    {/* Capture Button */}
                    <View style={styles.snapContainer}>
                        <TouchableOpacity onPress={takePicture}>    
                            <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fullScreenCamera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
    },
    button: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 50,
    },
    cameraControlButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 50,
    },
    snapContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 25,
    },
});
