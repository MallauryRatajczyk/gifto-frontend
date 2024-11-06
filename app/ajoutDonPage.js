import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import { addImage, removeImage } from '../reducers/imagesArticles';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
import Categories from '../elements/components/navigation/Categories';
import Photos from '../elements/images/Photos';
import CompletionCard from '../elements/components/cards/CompletionCard'; // Popup completion page
import AjoutHeader from '../elements/components/navigation/AjoutHeader';
import MainButton from '../elements/components/buttons/MainButton'; // Validation button
import { addDonation } from '../reducers/donation';



const BACKEND_ADDRESS = "http://192.168.1.182:3000";      // adresse à modifier

export default function AjoutDon({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value); 


  const [selectedImages, setSelectedImages] = useState([]);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [nomArticle, setNomArticle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [popupVisible, setPopupVisible] = useState(false); 

  // Fonction pour ajouter une image
  const handleImageAdd = (imageUri) => {
    setSelectedImages([...selectedImages, imageUri]);
    dispatch(addImage(imageUri));
  };

  const handleRemoveImage = (imageUri) => {
    setSelectedImages(selectedImages.filter(uri => uri !== imageUri));
    dispatch(removeImage(imageUri));
  };
  
const closeCamera = () => {
  setIsCameraVisible(false);
}

const handleSubmit = () => {
    setPopupVisible(true); 


        fetch(`${BACKEND_ADDRESS}/item`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: user.token, name: user.username, description: description, image: selectedImages, categorie: categorie, sousCategorie: sousCategorie, troc: false})     
        })  .then((response) => response.json())    
            .then((data) => {
            if (data.result) {
                dispatch(addDonation(data.itemPop))
                setPopupVisible(false); 
            } else {
                console.error('Erreur de création de la demande:', data.error);
                setPopupVisible(false); 
            }
        })
        .catch(error => {
            console.error('Erreur dans la requête:', error);
            setPopupVisible(false); 
        }); 
};

const closePopup = () => {
    setPopupVisible(false);
    navigation.navigate('Home'); // Navigate to Home screen after popup
};


  return (
    <SafeAreaProvider style={GlobalStyles.appStyle}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={80}>
            
            {/* Header */}

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                <AjoutHeader
                    title="Ajout de don"
                    backgroundColor={Colors.redColor}
                    textColor={Colors.whiteColor}
                    showBackButton={true}
                    backButtonColor={Colors.whiteColor} // Customize back button color
                />
                  
                {/* Bouton d'affichage de la camera */}
                    <TouchableOpacity onPress={() => setIsCameraVisible(true)} style={styles.imagePickerContainer}>
                    <_FontAwesome name="image" size={125} color="#D3D3D3" />
                    <Text style={styles.uploadText}>Prendre une photo</Text>
                    </TouchableOpacity>


                    <Photos
                        navigation={navigation}
                        onImageAdd={handleImageAdd}                                       // Ajoute une image
                        onClose={closeCamera} 
                        isCameraVisible={isCameraVisible}                        // Ferme la camera
                    />
                    
                    {/* Affichage et suppression d'images */}
                    <View style={styles.imagesContainer}>
                        {selectedImages.map((uri, index) => (
                        <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.imagePreview} />
                        <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveImage(uri)}>
                            <_FontAwesome name="trash" size={20} color="red" />
                        </TouchableOpacity>
                        </View>
                        ))}
                    </View>
                    <View style={styles.formContainer}>
                        {/* Nom de l'article */}
                        <Text style={styles.paragraphMain}>Nom de l'article</Text>
                        <TextInput style={styles.textAreas} value={nomArticle} onChangeText={setNomArticle}/>
                        {/* Utilisation du composant Categories */}
                        <Categories categorie={categorie} setCategorie={setCategorie} sousCategorie={sousCategorie} setSousCategorie={setSousCategorie}/>

                        {/* Description */}
                        <Text style={styles.paragraphMain}>Description de l'article</Text>
                        <TextInput style={[styles.textAreas, styles.paragraphSmall]} placeholder="Écrivez votre description ici..." value={description} onChangeText={setDescription}multiline/>

                        {/* Validation */}


                        <MainButton
                            title="Valider!"
                            onPress={handleSubmit}
                            normalBackgroundColor={Colors.redColor}
                            clickedBackgroundColor={Colors.textColor} 
                        />

                         {/* Completion Popup */}
                         <CompletionCard
                            visible={popupVisible}
                            onClose={closePopup}
                            iconColor={Colors.redColor} // Customize icon color
                            title="Opération Validée." // Customize title
                            navigation={navigation}
                            navigateTo="Home" 
                            duration={2000} 
                        />
        
                        
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#FF7B7B',
  },
  header: {
    fontFamily: 'BalooBhaijaan2_700Bold',
    fontSize: 36,
    lineHeight: 28,
    textAlign: 'center',
  },
  imagePickerContainer: {
    height: 150,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 13,
    color: '#666',
    marginTop: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
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
  formContainer: {
    gap: 15,
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
  pickerContainer: {
    marginVertical: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 16,
  },
  paragraphSmall: { //for description text
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 11,
    lineHeight: 12,
  },
  paragraphMain: { //main bodycopy font     //
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 13,
    lineHeight: 14,
    borderRadius: 10,
    borderColor: 'black',
    paddingTop: 15,
  },
  textAreas: { 
    borderWidth: 1,
    borderColor: '#707070',
    padding: 10,
    width: '100%',
    height: 'auto',
    borderRadius: 20,
  },
  redColor: {
    color:'#F08784',

  },
  
 
});