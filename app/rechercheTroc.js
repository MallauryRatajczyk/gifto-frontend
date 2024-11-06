import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../elements/components/buttons/MainButton';
import Typography from "../elements/styles/Typography";
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import { SearchIcon } from '../elements/assets/Icons';
import React from 'react';
import ImageHolder from '../elements/components/navigation/ImageHolder';
import { TroquerIcon } from '../elements/assets/Icons';
import ItemCard from '../elements/components/cards/ItemCard';
const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function RechercheTroc({ navigation }) {
    const [chercher, setChercher] = useState('');
    const [resultats, setResultats] = useState([]);
    const [itemRecommande, setItemRecommande] = useState([]);
    const [montreResult, setMontreResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const textColor = Colors.textColor;
    const iconColor = Colors.purpleColor;

    useEffect(() => {
        async function itemRandom() {
            const fetched = await fetch(`${BACKEND_ADDRESS}/item`);
            const response = await fetched.json();
            if (response) {
                // Filtre les items où troc est true
                const itemsTroc = response.item.filter(articl => articl.troc === true);
                const tableauMelange = itemsTroc.sort((a, b) => Math.random() - 0.5);
                if (tableauMelange.length == 1 || tableauMelange.length == 2) {
                    setItemRecommande(tableauMelange);
                } else if (tableauMelange.length >= 3) {
                    setItemRecommande(tableauMelange.slice(0, 3));
                }
            }
        }
        itemRandom(); // Appelle la fonction pour charger les articles recommandés au démarrage
    }, []);

    const handleSearch = () => {
        if (chercher.trim() === '') return;
        setLoading(true);
        fetch(`${BACKEND_ADDRESS}/item`)
            .then(response => response.json())
            .then(data => {
                // Filtre les items où troc est true
                const filtreTrocTrue = data.item.filter(item => item.troc === true);
                const resultatsFiltres = filtreTrocTrue.filter(item =>
                    item.name.toLowerCase().includes(chercher.toLowerCase())
                );
                setResultats(resultatsFiltres);
                setMontreResult(true);
                setLoading(false);
                setChercher('');
            })
            .catch(error => {
                console.error(error);
                setMontreResult(true); // Afficher les résultats même en cas d'erreur
                setResultats([]);
                setLoading(false);
                setChercher('');
            });
    }

    const handlePressItem = (itemId) => {
        navigation.navigate('ItemTroquerPage', { itemId: itemId});
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={GlobalStyles.screenMainContainer}>

                        <Text style={[styles.coloredHeader, styles.headerTextWhite]}>Troquer</Text>

                    <View style={[GlobalStyles.whiteSearchContainer, { flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
                        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                            <SearchIcon width={24} height={24} color={iconColor} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TextInput
                            onChangeText={(value) => setChercher(value)}
                            value={chercher}
                            style={{ flex: 1, color: textColor, fontSize: 16 }}
                            placeholder="Rechercher"
                            placeholderTextColor={Colors.shadow}
                            onPress={handleSearch}
                        />
                    </View>
                    {loading && <ActivityIndicator size="small" color={Colors.shadow} style={{ marginTop: 10 }} />}
                    <View style={{
                        paddingTop: 10,
                        alignItems: "center",
                        marginBottom: 25
                    }}>
                        {montreResult && resultats.length === 0 && (
                            <Text>Aucun résultat trouvé.</Text>
                        )}
                        {montreResult && resultats.length > 0 ? (
                            <>
                                <Text>Résultats de recherche :</Text>
                                <FlatList
                                    data={resultats}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({ item }) => (
                                        <ItemCard
                                        imageSource={{ uri: item.image || '-' }}
                                        title={item.name}
                                        description={item.description}
                                        subcategory={item.subcategory}
                                        showSubcategory={true}
                                        onPress={() => handlePressItem(item._id)}
                                    />
                                    )}
                                    style={{ marginTop: 10 }}
                                />
                            </>
                        ) : (
                            <>
                                <View style={GlobalStyles.screenHomeContainer}>
                                    <Text style={GlobalStyles.titleTextBlack}>Recommandations</Text>
                                </View>
                                <FlatList
                                    data={itemRecommande}
                                    keyExtractor={(item) => item._id.toString()}
                                    horizontal
                                    style={GlobalStyles.RecommendationContainer}
                                    renderItem={({ item }) => (
                                        <ItemCard
                                        imageSource={{ uri: item.image || '-' }}
                                        title={item.name}
                                        description={item.description}
                                        subcategory={item.subcategory}
                                        showSubcategory={true}
                                        onPress={() => handlePressItem(item._id)}
                                    />
                                    )}
                                    
                                />
                            </>
                        )}
                    </View>
                    <View style={GlobalStyles.screenHomeContainer}>
                        <View>
                            <Text style={styles.titleTextBlack}>Ajouter un item</Text>
                            <Text>Vous cherchez à échanger des articles avec quelque chose qui vous plait ?</Text>
                            <View>
                                <MainButton
                                    title="Créer !"
                                    onPress={() => navigation.navigate('CreationTroc')}
                                    normalBackgroundColor={Colors.purpleColor}
                                    clickedBackgroundColor={Colors.textColor}    // Clicked state background color
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({ //peut être à modifier
    coloredHeader: {
        backgroundColor: Colors.purpleColor, // Default color
        borderBottomRightRadius: 60,
        paddingTop: 60,
        marginBottom: 36,
        alignItems: 'left',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'left',
        height: 140,
    },
    headerTextWhite: {
        ...Typography.h1,
        color: Colors.whiteColor,
        paddingVertical: 24,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: -30,
    },
    titleTextBlack: {
        ...Typography.h2,
        color: Colors.textColor,
        paddingVertical: 12,
    },
    searchButton: {
        marginLeft: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
});    