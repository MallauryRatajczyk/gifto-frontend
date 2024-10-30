import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Modal, Text, Alert } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { useDispatch } from "react-redux";
import { addPhoto } from "../reducers/user";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const BACKEND_ADDRESS = "http://BACKEND_IP:3000";        

export default function UploadImages(navigation) {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const [hasPermission, setHasPermission] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);                       // image sélectionnée depuis la galerie

	let cameraRef = useRef(null);                                                   // ref de la camera pour la prise de photo

	useEffect(() => {                                                               // demande d'autorisation d'accès à la camera
		(async () => {
			const result = await Camera.requestCameraPermissionsAsync();
			setHasPermission(result.status === "granted");
		})();
	}, []);

	const takePicture = async () => {                                                // fonction pour prise de photo avec la caméra
		const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
		uploadImage(photo.uri);
	};

	const pickImage = async () => {                                                  // fonction pour ouvrir la galerie et sélectionner une image
		setModalVisible(false);
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {                                                      // si image sélectionnée on sauvegarde l'URI
			setSelectedImage(result.assets[0].uri);
			uploadImage(result.assets[0].uri);                                       // envoi de l'image au serveur
		} else {
			Alert.alert("Vous n'avez pas sélectionné d'image.");
		}
	};

	const uploadImage = async (imageUri) => {                                     // envoi de l'image au serveur
		const data = new FormData();                                              // ajout de l'image à la requête FormData
		data.append("photoFromFront", {
			uri: imageUri,
			name: "upload.jpg",
			type: "image/jpeg",
		});
		await fetch(`${BACKEND_ADDRESS}/upload`, {
			method: "POST",
			body: data,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(addPhoto(data.url));                                 // ajout de l'url de l'image au store redux
				} else {
					Alert.alert("Échec du téléchargement de l'image.");
				}
			})
			.catch((error) => {
				Alert.alert("Erreur lors de l'envoi de l'image :", error.message);
			});
	};

	if (!hasPermission || !isFocused) {                                           //Ne rien retourner  si pas de permission ou si l'écran n'est pas focus
		return <View />;
	}

	return (
		<View style={{ flex: 1 }}>
			<Camera
				type={type}
				flashMode={flashMode}
				ref={(ref) => (cameraRef = ref)}
				style={styles.camera}
			>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}                           //type camera
						style={styles.button}
					>
						<FontAwesome name="rotate-right" size={25} color="#ffffff" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}                     //flash
						style={styles.button}
					>
						<FontAwesome name="flash" size={25} color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"} />
					</TouchableOpacity>
				</View>

				<View style={styles.snapContainer}>               
					<TouchableOpacity onPress={() => setModalVisible(true)}>                                                         
						<FontAwesome name="upload" size={45} color="#ffffff" />
					</TouchableOpacity>
				</View>
			</Camera>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalText}>Choisir une option :</Text>
						<TouchableOpacity style={styles.modalButton} onPress={takePicture}>
							<Text style={styles.buttonText}>Prendre une photo</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalButton} onPress={pickImage}>
							<Text style={styles.buttonText}>Choisir depuis la galerie</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.modalButton, { backgroundColor: "#ccc" }]}
							onPress={() => setModalVisible(false)}
						>
							<Text style={styles.buttonText}>Annuler</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	camera: {
		flex: 1,
	},
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
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: 300,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
	},
	modalText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	modalButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 5,
		padding: 10,
		marginTop: 10,
		width: "100%",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
});
