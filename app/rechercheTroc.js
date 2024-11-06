import { useState, useEffect } from 'react';
import { FlatList, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../elements/components/buttons/MainButton';
import Typography from "../elements/styles/Typography";
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import React from 'react';
import ImageHolder from '../elements/components/navigation/ImageHolder';
import { TroquerIcon } from '../elements/assets/Icons';
import ItemCard from '../elements/components/cards/ItemCard';
import SearchBar from '../elements/components/navigation/SearchBar';
import { StyleSheet } from 'react-native';

const BACKEND_ADDRESS = "http://192.168.1.3:3000"

export default function RechercheTroc({ navigation }) {
    const [resultats, setResultats] = useState([]);
    const [itemRecommande, setItemRecommande] = useState([]);
    const [montreResult, setMontreResult] = useState(false);

    useEffect(() => {
        function itemRandom() {
            fetch(`${BACKEND_ADDRESS}/item`)
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        const itemsTroc = response.item.filter(articl => articl.troc === true);
                        const tableauMelange = itemsTroc.sort((a, b) => Math.random() - 0.5);
                        if (tableauMelange.length == 1 || tableauMelange.length == 2) {
                            setItemRecommande(tableauMelange);
                        } else if (tableauMelange.length >= 3) {
                            setItemRecommande(tableauMelange.slice(0, 3));
                        }
                    }
                });
        }
        itemRandom();
    }, []);

    const handleSearchResults = (results) => {
        if (results.length === 0 && !montreResult) {
            return;
        }
        setResultats(results);
        setMontreResult(true);
    };

    const handlePressItem = (itemId) => {
        navigation.navigate('ItemTroquerPage', { itemId: itemId});
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={GlobalStyles.screenMainContainer}>
                    <View icon={TroquerIcon}>
                        <Text style={[styles.coloredHeader, styles.headerTextWhite]}>Troquer</Text>
                    </View>
                    
                    <SearchBar 
                        placeholder="Rechercher"
                        trocValue={true}
                        onSearch={handleSearchResults}
                    />

                    <View style={styles.resultsContainer}>
                        {!montreResult && resultats.length !== 0 ? (
                            <Text>Aucun résultat trouvé.</Text>
                        ) : montreResult && resultats.length > 0 ? (
                            <>
                                <Text style={styles.resultTitle}>Résultats de recherche :</Text>
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
                                    style={styles.searchResultsList}
                                    contentContainerStyle={styles.searchResultsContent}
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
                                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.shadow }}>
                                            <ImageHolder onPress={() => handlePressItem(item._id)}/>
                                        </View>
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
                                    clickedBackgroundColor={Colors.textColor}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    coloredHeader: {
        backgroundColor: Colors.purpleColor,
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
    resultsContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
        marginBottom: 25,
    },
    searchResultsList: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    },
    searchResultsContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    resultTitle: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '500',
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