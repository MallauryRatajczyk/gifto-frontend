import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { addImage, removeImage } from '../reducers/imagesArticles';
import { useDispatch } from 'react-redux';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
import UploadImages from '../elements/images/UploadImages';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import Categories from '../elements/components/navigation/Categories';

export default function AjoutDon({ navigation }) {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false); // Contrôle de l'affichage de la modale
  const [nomArticle, setNomArticle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [description, setDescription] = useState('');

  // Fonction pour ajouter une image
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
  };
  
  return (
    // <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Ajout de don</Text>
                </View> 
            
                {/* Bouton d'affichage de la modale */}
                <TouchableOpacity onPress={() => setIsUploadVisible(true)} style={styles.imagePickerContainer}>
                <_FontAwesome name="image" size={125} color="#D3D3D3" />
                <Text style={styles.uploadText}>Ajouter une image</Text>
                </TouchableOpacity>

                {/* Affiche UploadImages seulement si `isUploadVisible` est `true` */}
                {isUploadVisible && (
                <UploadImages
                    onImageAdd={handleImageAdd}                                       // Ajoute une image
                    onClose={() => setIsUploadVisible(false)}                         // Ferme la modale
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
                <View style={styles.formContainer}>
                    {/* Nom de l'article */}
                    <TextInput style={styles.paragraphMain} placeholder="Nom de l'article" value={nomArticle} onChangeText={setNomArticle}/>
                    {/* Utilisation du composant Categories */}
                    <Categories categorie={categorie} setCategorie={setCategorie} sousCategorie={sousCategorie} setSousCategorie={setSousCategorie}/>

                    {/* Description */}
                    <Text style={styles.paragraphMain}>Description de l'article</Text>
                    <TextInput style={[styles.input, styles.paragraphSmall]} placeholder="Écrivez votre description ici..." value={description} onChangeText={setDescription}multiline/>

                    {/* Validation */}
                    <TouchableOpacity onPress={handleSubmit}>
                    <SecondaryButton title='Valider!' />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        
      </SafeAreaView>
    // </SafeAreaProvider>
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
