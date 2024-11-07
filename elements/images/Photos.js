import React, { useState, useEffect, useRef } from "react"; 
import { StyleSheet, TouchableOpacity, View, Modal, Text, Alert } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy"; 
import { useDispatch } from "react-redux";
import { addImage, removeImage } from "../../reducers/imagesArticles";
// import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome"; 
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from "@react-navigation/native";

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function Photos({ navigation, visible, onClose, onImageAdd }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
    // const [isCameraVisible, setIsCameraVisible] = useState(false);    

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
        <Camera style={styles.fullScreenCamera} type={type} flashMode={flashMode} ref={(ref) => (cameraRef.current = ref)} >
            <View style={styles.cameraOverlay}>
                <View style={styles.topButtonsContainer}>
                    <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} style={styles.button}>
                        <FontAwesome name="rotate-right" size={25} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)} style={styles.button}>
                        <FontAwesome name="flash" size={25} color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClose()} style={styles.cameraControlButton}>
                        <FontAwesome name="close" size={25} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                {/* ajout des fonctions : onImageAdd, onClose */}
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
    camera: { flex: 1, },
    buttonsContainer: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
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
    fullScreenCamera: { flex: 1, },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    cameraControlButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 50,
    },
});