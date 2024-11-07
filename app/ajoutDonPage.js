import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import { addImage, removeImage } from '../reducers/imagesArticles';
import { CameraIcon, ImageHolderIcon } from '../elements/assets/Icons';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
import Categories from '../elements/components/navigation/Categories';
import Photos from '../elements/images/Photos';
import CompletionCard from '../elements/components/cards/CompletionCard'; // Popup completion page
import AjoutHeader from '../elements/components/navigation/AjoutHeader';
import MainButton from '../elements/components/buttons/MainButton'; // Validation button
import { addDonation } from '../reducers/donation';
import DescriptionCard from '../elements/components/cards/DescriptionCard';
import InputCard from '../elements/components/cards/InputCard';


const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;     // adresse à modifier

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
  const [errorMessage, setErrorMessage] = useState('');
  

  // Ajouter une image
  const handleImageAdd = (imageUri) => {
    console.log("Image URI to add:", imageUri); // Log the image URI being added
    setSelectedImages([...selectedImages, imageUri]);
    console.log("Updated selectedImages:", [...selectedImages, imageUri]); // Log the updated state
    dispatch(addImage(imageUri));
  };

  // Supprimer une image
  const handleRemoveImage = (imageUri) => {
    setSelectedImages(selectedImages.filter(uri => uri !== imageUri));
    dispatch(removeImage(imageUri));
  };

  // Fermer la camera
const closeCamera = () => {
  setIsCameraVisible(false);
}

// Vérifier la validation du formulaire


//Soumettre le formulaire
const handleSubmit = () => {
    if (!nomArticle || !description || selectedImages.length === 0) {
        setErrorMessage("Veuillez remplir tous les champs requis");
    } 
    else { 
        console.log('Formulaire validé, tous les champs sont bien remplis.');
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
            console.error('Erreur de création de la demande:', data.error);      //verification du fetch
            setPopupVisible(false); 
        }
    })
    .catch(error => {
        console.error('Erreur dans la requête:', error);
        setPopupVisible(false); 
    }); 
} 
};

//fermer la popup et aller à la page d'accueil
const closePopup = () => {
    setPopupVisible(false);
    navigation.navigate('Home'); 
};

  return (
    <SafeAreaProvider style={GlobalStyles.appStyle}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.container} keyboardVerticalOffset={80}>

          <ScrollView style={styles.scrollContainer}>

            {/* Header */}
            <AjoutHeader
                title="Ajout de don"
                backgroundColor={Colors.redColor}
                textColor={Colors.whiteColor}
                showBackButton={true}
                backButtonColor={Colors.redColor} // Customize back button color
              />
              
            {/* Contenu */}
            <View style={styles.content}>
            {/* Bouton d'affichage de la camera */}
                <TouchableOpacity onPress={() => setIsCameraVisible(true)} style={GlobalStyles.whiteCardContainer}>
                    <CameraIcon width={60} height={60} color={Colors.lightGreyColor} />
                    <Text style={[GlobalStyles.subtitleTextLightGrey, { marginTop: 20 }]}>Prendre une photo</Text>
                </TouchableOpacity>

                <Photos
                    navigation={navigation}
                    onImageAdd={handleImageAdd}// Ajoute une image
                    onClose={closeCamera} 
                    isCameraVisible={isCameraVisible}// Ferme la camera
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
          
            {/* Form */}
            <View style={styles.formContainer}>
                {/* Nom de l'article */}
                <InputCard
                  title="Nom de l'article"
                  value={nomArticle}
                  onChangeText={setNomArticle}
                  placeholder="Entrez le nom de l'article"
                  autoCapitalize="sentences"
                />

                {/* Utilisation du composant Categories */}
                <Categories 
                  categorie={categorie} 
                  setCategorie={setCategorie} 
                  sousCategorie={sousCategorie} 
                  setSousCategorie={setSousCategorie}/>

                {/* Description */}
                <DescriptionCard
                  title="Description de l'article"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Écrivez votre description ici..."
                />

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
    container: { flex: 1 },
    scrollContainer: { flex: 1 },
    content: { padding: 20 },
    formContainer: { gap: 15 },
});



/*
// Vérifier la validation du formulaire
const validateForm = () => {
    if (!nomArticle.trim()) {
        setErrorMessage("Le nom de l'article est requis.");
        return false;
    }
    if (!description.trim()) {
        setErrorMessage("La description est requise.");
        return false;
    }
    if (!categorie.trim()) {
        setErrorMessage("La catégorie est requise.");
        return false;
    }
    if (!sousCategorie.trim()) {
        setErrorMessage("La sous-catégorie est requise.");
        return false;
    }
    setErrorMessage('');  // Aucune erreur si tout est bien rempli
    return true;
};
*/
