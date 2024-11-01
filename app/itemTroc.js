import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../elements/components/buttons/MainButton';
import Typography from "../elements/styles/Typography";
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';
import { SearchIcon } from '../elements/assets/Icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ImageHolder from '../elements/components/navigation/ImageHolder';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';

import SearchBar from '../elements/components/navigation/SearchBar';

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

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
