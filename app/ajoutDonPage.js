import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Picker, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { addImage, removeImage } from '../reducers/imagesArticles';
import { useDispatch} from 'react-redux';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
// const FontAwesome = _FontAwesome as React.ElementType;


const BACKEND_ADDRESS = "http://192.168.1.182:3000/upload";

export default function AjoutDon(navigation) {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [nomArticle, setNomArticle] = useState('');
    const [categorie, setCategorie] = useState('');
    const [sousCategorie, setSousCategorie] = useState('');
    const [description, setDescription] = useState('');

    const pickImage = async () => {                                // rechercher l'image dans la bibliothèque
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {                                    // le user sélectionne une image
            setSelectedImage(result.assets[0].uri);                // uri de l'image stockée dans setSelectedImage
            uploadImage(result.assets[0].uri);                     // appel de la fonction uploadImage avec l'uri de l'image
        } else {
          Alert.alert("Vous n'avez pas sélectionné d'image.");
        }
    };

        const uploadImage = async (imageUri) => {
            const data = new FormData();                          //FormData prépare l'image pour l'envoyer au serveur
            data.append('photoFromFront', {                       // image ajoutée avec le champ photoFromFront
              uri: imageUri,
              name: 'upload.jpg',
              type: 'image/jpeg',
            });                                                   

            await fetch(`${BACKEND_ADDRESS}/upload`, {              // envoi d'une requête post au serveur à l'adresse BACKEND_ADRESS avec data en corps de requête
                method: "POST",
                body: data,
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    dispatch(addImage(data.url));                     // Stocke l'URL Cloudinary dans le store Redux
                } else {
                    Alert.alert("Échec du téléchargement de l'image.");
                }
            })
            .catch((error) => {
                Alert.alert("Erreur lors de l'envoi de l'image :", error.message);
            });
        };

    

    // const handleRemoveImage = (imageUri) => {
    //   dispatch(removeImage(imageUri));}
    

    // const handleSubmit = () => {
    //     pickImage();
    //   };
    
    
    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <Text style = {styles.header}> Ajout de don </Text>
                    <_FontAwesome name="arrow-left" size={25} color="#ffffff" />

                    <ScrollView style={styles.scrollContainer}>
                        {/* Ajouter une image */}
                        <TouchableOpacity onPress={pickImage} style={styles.ImagePicker}>
                            {selectedImage ? (<Image source={{uri: selectedImage}} style={styles.imagePreview}/>) : (<Text style={styles.imageText}>Cliquez pour charger</Text>)} 
                            <_FontAwesome name="image" size={50}    />       
                        </TouchableOpacity>

                        {/* Nom de l'article */}
                        <TextInput style={styles.input} placeholder="Nom de l'article" value={nomArticle} onChangeText={setNomArticle}
                        />

                        {/* Sélecteur de catégorie */}
                        <View style={styles.pickerContainer}>  
                            {/* <Picker selectedValue={categorie} onValueChange={(itemValue) => setCategorie(itemValue)} style={styles.picker}>
                            <Picker.Item label="Sélectionner une catégorie" value="" />
                            <Picker.Item label="Vêtements" value="vetements" />
                            <Picker.Item label="Électronique" value="electronique" />
                            <Picker.Item label="Livres" value="livres" />
                            </Picker> */}

                         {/* Sous-catégorie */}
                            <TextInput style={styles.input} placeholder="Sous-catégories" value={sousCategorie} onChangeText={setSousCategorie} />
                            
                            {/* Description */}
                            <TextInput style={[styles.input, styles.textArea]} placeholder="Écrivez votre description ici..." value={description} onChangeText={setDescription}
                            multiline/>

                            {/* Bouton de validation */} 
                            {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Valider!</Text>
                            </TouchableOpacity> */}
                            {/* navigation */}
                            <TouchableOpacity style={styles.purpleSquare} onPress={() => navigation.navigate('Connection')} >
                                 <Text style={styles.textButton}>Se connecter</Text>
                            </TouchableOpacity>

                        </View>
                    


                    </ScrollView>

                </View>
                
            </SafeAreaView>
        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoConnection: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    textButton: {
        fontFamily: 'BalooBhaina2-Regular',
        color: 'red',
        textAlign: 'center'
    },
    
});