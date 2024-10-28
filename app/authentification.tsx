import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connection from "./connexionPage";
import Inscription from "./inscriptionPage";


export default function Authentification() {

    const Stack = createNativeStackNavigator();
    return (


        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, marginBottom: 100, alignItems: "center", justifyContent: "space-between" }}>

                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Connection" component={Connection} />
                        <Stack.Screen name="Inscription" component={Inscription} />
                    </Stack.Navigator>
                </NavigationContainer>
                <View
                    style={{
                        paddingTop: 10,
                        alignItems: "center",

                    }}
                >
                    <Image source={require('../assets/images/logoWithoutGifto.png')} style={styles.logoConnection} />
                    <Text style={styles.h1}>Bienvenue sur Gifto</Text>
                </View>
                <TouchableOpacity style={styles.purpleSquare} >
                    <Text style={styles.textButton}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteSquare} >
                    <Text style={styles.textButtonWithWhiteSquare}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteSquare} >
                    <Text style={styles.textButtonWithWhiteSquare}>Google</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider >
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
    h1: {
        color: "#8B85EF",
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'BalooBhaina2-Regular'
    },
    textContain: {
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 36,
        color: "#8B85EF",
    },
    purpleSquare: {
        backgroundColor: "#8B85EF",
        width: 320,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteSquare: {
        backgroundColor: "white",
        width: 320,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontFamily: 'BalooBhaina2-Regular',
        color: "white",
        textAlign: 'center',
        fontSize: 20,
    },
    textButtonWithWhiteSquare: {
        fontFamily: 'BalooBhaina2-Regular',
        color: "#8B85EF",
        textAlign: 'center',
        fontSize: 20,
    }
});