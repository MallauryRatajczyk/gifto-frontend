import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Modal, Text, Alert } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../reducers/imagesArticles";
// import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";


const BACKEND_ADDRESS = "http://192.168.1.182:3000";        

export default function Photos(onImageAdd, onClose) {
    const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const [hasPermission, setHasPermission] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [flashMode, setFlashMode] = useState(FlashMode.off);

    let cameraRef = useRef(null);

    useEffect(() => {
		(async () => {
			const result = await Camera.requestCameraPermissionsAsync();
			if (result) {
				setHasPermission(result.status === "granted");
			}
		})();
	}, []);

    const takePicture = async () => {
		const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
		const formData = new FormData();
		const uri = photo?.uri;

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
				data.result && dispatch(addPhoto(data.url));
			});
	};

	if (!hasPermission || !isFocused) {
		return <View />;
	}



    return (
		<Camera type={type} flashMode={flashMode} ref={(ref) => (cameraRef = ref)} style={styles.camera}>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} style={styles.button}>
					<FontAwesome name="rotate-right" size={25} color="#ffffff" />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)} style={styles.button}>
					<FontAwesome name="flash" size={25} color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"} />
				</TouchableOpacity>
			</View>

			<View style={styles.snapContainer}>
				<TouchableOpacity onPress={() => cameraRef && takePicture()}>
					<FontAwesome name="circle-thin" size={95} color="#ffffff" />
				</TouchableOpacity>
			</View>
		</Camera>



    );
};

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
});