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
import PictureProfile from '../elements/components/buttons/PictureProfileButton';

import SearchBar from '../elements/components/navigation/SearchBar';
const BACKEND_ADDRESS = "http://192.168.1.81:3000"

export default function ItemTroc({ navigation }) {
    const profileImageUrl = useSelector((state) => state.user.value.imageUrl);
    const username = useSelector((state) => state.user.username);

    return (
        <SafeAreaProvider style={{ padding: 10 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={GlobalStyles.WelcomeContainer}>
                    <View style={[styles.coloredHeader, styles.headerTextWhite]} >
                        <PictureProfile
                            imageUrl={profileImageUrl}
                            onPress={() => navigation.navigate('ProfilePage')}
                        />
                        {/* <Text style={GlobalStyles.titleTextBlack}>Bonjour {firstName}</Text>*/}
                        <Text>Bonjour {username}</Text>
                    </View>
                </View>
                <Text >item</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
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
