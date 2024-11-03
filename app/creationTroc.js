import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Picker, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '../elements/styles/Colors';
import MainButton from '../elements/components/buttons/MainButton'; //validation button
import CompletionCard  from '../elements/components/cards/CompletionCard'; //popup completion page

// import * as ImagePicker from 'expo-image-picker';
//import { Picker } from '@react-native-picker/picker';
import { addImage, removeImage } from '../reducers/imagesArticles';
import { useDispatch } from 'react-redux';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
//import UploadImages from '../elements/imageHandlers/UploadImages';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';

// import Categories from './Categories';

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function CreeTrocScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [nomArticle, setNomArticle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [popupVisible, setPopupVisible] = useState(false); //popup page state

  const handleImageAdd = (imageUri) => {
    setSelectedImages([...selectedImages, imageUri]);
    dispatch(addImage(imageUri));
  };

  const handleRemoveImage = (imageUri) => {
    setSelectedImages(selectedImages.filter(uri => uri !== imageUri));
    dispatch(removeImage(imageUri));
  };

  const handleSubmit = () => {
    // logique de soumission ici
    setPopupVisible(true); //to activate the popup
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text style={styles.header}>Ajout de troc</Text>
          <_FontAwesome name="arrow-left" size={25} color="#ffffff" />

          <ScrollView style={styles.scrollContainer}>
            {/* Ajouter une image */}
            <UploadImages />
            <TouchableOpacity onPress={() => setIsUploadVisible(true)} style={styles.ImagePicker}>
              <_FontAwesome name="image" size={50} color="#4CAF50" />
              <Text style={styles.imageText}>Cliquez pour charger</Text>
            </TouchableOpacity>

            {isUploadVisible && (
              <UploadImages
                onImageAdd={handleImageAdd}                                                // Fonction pour ajouter une image
                onClose={() => setIsUploadVisible(false)}                                  // Ferme UploadImages
              />
            )}

            {/* Suppression d'images */}
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

            {/* Nom de l'article */}
            <TextInput
              style={styles.input}
              placeholder="Nom de l'article"
              value={nomArticle}
              onChangeText={setNomArticle}
            />

            {/* Utilisation du composant Categories */}
            {/*<Categories
              categorie={categorie}
              setCategorie={setCategorie}
              sousCategorie={sousCategorie}
              setSousCategorie={setSousCategorie}
            /> */}

            {/* Description */}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Écrivez votre description ici..."
              value={description}
              onChangeText={setDescription}
              multiline
            />

                {/* Validation Button */}
                <MainButton
                  title="Valider!"
                  onPress={handleSubmit}
                  normalBackgroundColor={Colors.purpleColor}
                  clickedBackgroundColor={Colors.textColor} 
                />

                {/* Completion Popup (With Rocket Icon) */}
                <CompletionCard
                  visible={popupVisible}
                  onClose={closePopup}
                  iconColor={Colors.purpleColor} // Customize icon color
                  title="Opération Validée." // Customize title
                  navigation={navigation}
                  navigateTo="RechercheTroc" 
                  duration={2000} 
                />

            {/* Spacing */}
            <View style={{ marginVertical: 160 }} />
            
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
  pickerContainer: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
  },
  imageText: {
    textAlign: 'center',
    marginTop: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
  removeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
});
