import React, { useState } from 'react';
import { View, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalStyles from '../elements/styles/GlobalStyles';
import Colors from '../elements/styles/Colors';
import { useDispatch } from 'react-redux'; 

//components
import AjoutHeader from '../elements/components/navigation/AjoutHeader';
import AddImageCard from '../elements/components/cards/AddImageCard'; 
import InputCard from '../elements/components/cards/InputCard';
import Categories from '../elements/components/navigation/Categories';
import DescriptionCard from '../elements/components/cards/DescriptionCard';
import MainButton from '../elements/components/buttons/MainButton'; // Validation button
import CompletionCard from '../elements/components/cards/CompletionCard'; // Popup completion page

export default function AjoutDon({ navigation }) {
    const dispatch = useDispatch();
    const [nomArticle, setNomArticle] = useState('');
    const [categorie, setCategorie] = useState(''); // Ensure categorie is initialized
    const [sousCategorie, setSousCategorie] = useState([]); // Ensure sousCategorie is initialized as an array for multi-select
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false); // Popup page state

    // Function to handle image addition from AddImageCard
    const handleImagesChange = (images) => {
        setSelectedImages(images);
    };

    const handleSubmit = () => {
        setPopupVisible(true); // Activate the popup
    };

    const closePopup = () => {
        setPopupVisible(false);
        navigation.navigate("Home"); // Navigate to Home screen after popup
    };

    return (
        <SafeAreaProvider style={GlobalStyles.appStyle}>
            <SafeAreaView style={{ flex: 1 }}>
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
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={GlobalStyles.screenHomeContainer}>
                        {/* Add Image Card */}
                        <AddImageCard
                            onImagesChange={handleImagesChange}
                            existingImages={selectedImages}
                            containerStyle={{ marginBottom: 20 }}
                            showTitle={true}
                            title="Ajouter des images"
                        />

                        {/* Nom de l'article */}
                        <InputCard
                            title="Nom de l’article"
                            onChangeText={setNomArticle}
                            value={nomArticle}
                            placeholder="Article de Gifto"
                        />

                        {/* Category Selection */}
                        <Categories
                            categorie={categorie}
                            setCategorie={setCategorie}
                            sousCategorie={sousCategorie}
                            setSousCategorie={setSousCategorie}
                        />

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

                        {/* Spacing */}
                        <View style={{ marginVertical: 160 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

