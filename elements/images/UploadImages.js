import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Modal, Text, Alert } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../reducers/imagesArticles";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";


const BACKEND_ADDRESS = "http://192.168.1.182:3000";        

export default function UploadImages({onImageAdd, onClose}) {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const [hasPermission, setHasPermission] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const [modalVisible, setModalVisible] = useState(true);
	const [isCameraActive, setIsCameraActive] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);                      

	let cameraRef = useRef(null);                                                   // ref de la camera pour la prise de photo
	
	// useEffect(() => {
	// 	setModalVisible(true);
	//   }, []);
	  
	const requestPermissionAndTakePicture = async () => {                         // Demande la permission pour la caméra seulement quand l'utilisateur clique pour prendre une photo	
    const result = await Camera.requestCameraPermissionsAsync();
    setHasPermission(result.status === "granted");

	if (result.status === "granted") {
		takePicture();                                                             // Lance la prise de photo
	  } else {
		Alert.alert("Permission de la caméra refusée");
	  }
	};

	const takePicture = async () => {   
		setIsCameraActive(true);                                                       // Activer la caméra                                             
		const photo = await ImagePicker.launchCameraAsync({ quality: 0.3 });          // fonction pour prise de photo avec la caméra
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

	const uploadImage = (imageUri) => {                                     // envoi de l'image au serveur
		const data = new FormData();                                              // ajout de l'image à la requête FormData
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
					onImageAdd(data.url);                                              // image ajouté
                    onClose();                                                        // l'UploadImages de l'image est fermé après chargement                                
				} else {
					Alert.alert("Échec du téléchargement de l'image.");
					
				}
			})
			.catch((error) => {
				Alert.alert("Erreur lors de l'envoi de l'image :", error.message);
			});
	};

	if (!isFocused) {                                         // modif  //Ne rien retourner  si pas de permission ou si l'écran n'est pas focus
		return <View />;
	}

	const showModal = () =>{ setModalVisible(true)
		console.log(modalVisible);
	};
	

	return (
		<View style={{ flex: 1 }}>

            <Modal                                                                         //modal visible
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
				
			>
				<View style={styles.modalOverlay}>                                                     
					<View style={styles.modalContainer}>
						<Text style={styles.modalText}>Choisir une option :</Text>
						<TouchableOpacity style={styles.modalButton} onPress={() => {
        					requestPermissionAndTakePicture();                                      // Appelle takePicture si la permission est accordée
        						setModalVisible(false);                                             // Ferme la modal
    						}}>
  						<Text style={styles.buttonText}>Prendre une photo</Text>
  						</TouchableOpacity>
						<TouchableOpacity style={styles.modalButton} onPress={pickImage}>
							<Text style={styles.buttonText}>Choisir depuis la galerie</Text>
						</TouchableOpacity>
						<Text style={styles.buttonText}>Annuler</Text>
							
					</View>
				</View>
			</Modal>

            {!modalVisible && (                                                              //modal invisible
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
					<TouchableOpacity onPress={showModal}>                                                         
						<FontAwesome name="upload" size={45} color="#ffffff" />
					</TouchableOpacity>
				</View>
				
			</Camera>
            )}
			
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
	modalText: {                                       //
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		fontFamily: 'BalooBhaijaan2_600SemiBold',
		fontSize: 16,
		lineHeight: 16,
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
