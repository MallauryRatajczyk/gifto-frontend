import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../elements/components/buttons/MainButton'; //validation button
import CompletionCard  from '../elements/components/cards/CompletionCard'; //popup completion page
import GlobalStyles from '../elements/styles/GlobalStyles';
import Colors from '../elements/styles/Colors';
import InputCard from '../elements/components/cards/InputCard';
import DescriptionCard  from '../elements/components/cards/DescriptionCard';
import AjoutHeader from '../elements/components/navigation/AjoutHeader';

import Categories from '../elements/components/navigation/Categories';

import { useDispatch } from 'react-redux'; //used to dispatch actions to the store
import { addImage, removeImage } from '../reducers/imagesArticles';
import UploadImages from '../elements/images/UploadImages';
import Photos from '../elements/images/Photos';

import { Picker } from '@react-native-picker/picker'; //used to select a value from a list
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';



export default function AjoutDon({ navigation }) {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false); // Contrôle de l'affichage de la modale
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [nomArticle, setNomArticle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [description, setDescription] = useState(''); // description de l'article
  const [popupVisible, setPopupVisible] = useState(false); //popup page state
  

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
    // logique de soumission ici
    setPopupVisible(true); //to activate the popup
  };

   const closePopup = () => {
    setPopupVisible(false);
  };
  
  return (
    <SafeAreaProvider style={GlobalStyles.appStyle}>
      <SafeAreaView>

        {/* Header */}
        <AjoutHeader
          title="Ajout de don"
          backgroundColor={Colors.redColor}
          textColor={Colors.whiteColor}
          showBackButton={true}
          backButtonColor={Colors.whiteColor} // Customize back button color
        />
        
        <ScrollView
        style={GlobalStyles.scrollViewContent}
        keyboardShouldPersistTaps="handled" >
        
          {/* Add a wrapper for shadow spacing */}
          <View style={GlobalStyles.screenHomeContainer}>


          
              {/* Bouton d'affichage de la modale
              <TouchableOpacity onPress={() => setIsUploadVisible(true)} style={styles.imagePickerContainer}>
              <_FontAwesome name="image" size={125} color="#D3D3D3" />
              <Text style={styles.uploadText}>Ajouter une image</Text>
              </TouchableOpacity> */}

            {/* Bouton d'affichage de la camera */}
              <TouchableOpacity onPress={() => setIsCameraVisible(true)} style={styles.imagePickerContainer}>
              <_FontAwesome name="image" size={125} color="#D3D3D3" />
              <Text style={styles.uploadText}>Prendre une photo</Text>
              </TouchableOpacity>



              {/* Affiche UploadImages seulement si `isUploadVisible` est `true`
              {isUploadVisible && (
              <UploadImages
                  onImageAdd={handleImageAdd}                               
                  onClose={() => setIsUploadVisible(false)}                
              />
              )} */}

                {/* Affiche le composant Photos seulement si `isCameraVisible` est `true` */}
                
              <Photos
                  navigation={navigation}
                  onImageAdd={handleImageAdd}  
                  onClose={closeCamera} 
                  isCameraVisible={isCameraVisible}
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
                <InputCard
                  title="Nom de l’article"
                  onChangeText={setNomArticle}
                  value={nomArticle}
                  placeholder="Article de Gifto"
                />

                  {/* Utilisation du composant Categories */}
                  {/*<Categories categorie={categorie} setCategorie={setCategorie} sousCategorie={sousCategorie} setSousCategorie={setSousCategorie}/>  */}

                {/* Description */}
                <DescriptionCard
                  value={description}
                  onChangeText={setDescription}
                  showTitle={true}
                  placeholderTextColor={Colors.lightGreyColor}
                  inputStyle={{ backgroundColor: Colors.whiteColor }}
                />

                {/* Validation Button */}
                <MainButton
                  title="Valider!"
                  onPress={handleSubmit}
                  normalBackgroundColor={Colors.redColor}
                  clickedBackgroundColor={Colors.textColor} 
                />

                {/* Completion Popup (With Rocket Icon) */}
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

            {/* Spacing */}
            <View style={{ marginVertical: 160 }} />


          </View>
        </ScrollView>
        
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
  },
  
 
});




