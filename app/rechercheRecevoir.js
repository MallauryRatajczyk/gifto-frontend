import { useState, useEffect } from 'react';
import { FlatList, Text, View, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../elements/components/buttons/MainButton';
import Typography from "../elements/styles/Typography";
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import React from 'react';
import ImageHolder from '../elements/components/navigation/ImageHolder';
import { RecevoirIcon } from '../elements/assets/Icons';
import ItemCard from '../elements/components/cards/ItemCard';

import SearchBar from '../elements/components/navigation/SearchBar';
import { StyleSheet } from 'react-native';

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

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
        navigation.navigate('ItemRecevoirPage', { itemId: itemId });
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={GlobalStyles.appStyle}>
                <ScrollView 
                    contentContainerStyle={GlobalStyles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={[styles.coloredHeader, {flexDirection: 'column', alignItems: 'center', height: 220}]} >
                        <View style={[{ marginBottom: 20, width: '94%' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                <RecevoirIcon width={50} height={50} color={Colors.whiteColor} />
                                <Text style={[GlobalStyles.headerTextWhite, { marginBottom: -50 }]}>Recevoir</Text>
                            </View>
                            
                            <SearchBar 
                                placeholder="Rechercher"
                                trocValue={true}
                                onSearch={handleSearchResults}
                            />
                        </View>
                    </View>

                    {/* Resultat de la recherche */}
                    <View style={[{ marginTop: 40, alignItems: 'center' }]}>
                        {montreResult && resultats.length > 0 && (
                            <>
                                <Text style={GlobalStyles.subtitleTextPurple}>Résultats de recherche</Text>
                                <View style={{ paddingHorizontal: 20, justifyContent: 'center' }}>
                                    {resultats.map((item) => (
                                        <ItemCard
                                            key={item._id.toString()}
                                            imageSource={{ uri: item.image || '-' }}
                                            title={item.name}
                                            description={item.description}
                                            subcategory={item.subcategory}
                                            showSubcategory={true}
                                            onPress={() => handlePressItem(item._id)}
                                        />
                                    ))}
                                </View>
                            </>
                        )}
                    </View>

                    {/* Message aucun résultat */}
                    {montreResult && resultats.length === 0 && (
                        <View style={GlobalStyles.screenHomeContainer}>
                            <Text style={GlobalStyles.bodyTextGrey}>Aucun résultat trouvé.</Text>
                        </View>
                    )}

                    {/* Recommandations */}
                    {(!montreResult || resultats.length === 0) && (
                        <>
                            <View style={[GlobalStyles.screenHomeContainer, { marginTop: -70 }]}>
                                <Text style={GlobalStyles.titleTextBlack}>Recommandations</Text>
                            </View>
                            <View style={{ 
                                overflow: 'visible', 

                            }}>
                                <FlatList 
                                    data={itemRecommande}
                                    keyExtractor={
                                        (item) => item._id.toString()}
                                    horizontal
                                    renderItem={({ item }) => (
                                        <View style={{ 
                                            padding: 10,
                                        }}>
                                            <ImageHolder 
                                                onPress={() => handlePressItem(item._id)}
                                            />
                                        </View>
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </>
                    )}

                    {/* Spacing */}
                    <View style={{ marginVertical: 100 }} />

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({ //peut être à modifier
    coloredHeader: {
        backgroundColor: Colors.greenColor, // Default color
        borderBottomRightRadius: 60,
        paddingTop: 60,
        marginBottom: 36,
        alignItems: 'left',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'left',
        height: 140,
    },
})