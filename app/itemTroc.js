import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import MainButton from '../elements/components/buttons/MainButton';
import Typography from "../elements/styles/Typography";
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import { SearchIcon } from '../elements/assets/Icons';

export default function ItemTrocScreen({ navigation }) {
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
    return (
        <SafeAreaProvider style={{ padding: 10 }}>
            <SafeAreaView style={{ flex : 1}}>
            <Text >item</Text>
            </SafeAreaView>
            </SafeAreaProvider>
    )
}
