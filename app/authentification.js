import { Text, View, Image, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Application from 'expo-application';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';

export default function Authentification({ navigation }) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '887056109032-ja5jqdiubjk4h8ppn2e2mu24q0v5u4io.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({
            useProxy: true, // Utilisez true si vous êtes en développement avec Expo Go
        }),
    });
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            // Utilisez l'id_token pour authentifier l'utilisateur sur votre backend
            Alert.alert('Token reçu', id_token);
        }
    }, [response]);

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, marginBottom: 100, alignItems: "center", justifyContent: "space-between" }}>
                <View
                    style={{
                        paddingTop: 10,
                        alignItems: "center",

                    }}
                >
                    <Image source={require('../assets/images/logoWithoutGifto.png')} style={styles.logoConnection} />
                    <Text style={styles.h1}>Bienvenue sur Gifto</Text>
                </View>
                <TouchableOpacity style={styles.purpleSquare} onPress={() => navigation.navigate('Connection')} >
                    <Text style={styles.textButton}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteSquare} onPress={() => navigation.navigate('Inscription')} >
                    <Text style={styles.textButtonWithWhiteSquare}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteSquare} disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }} >
                    <Text style={styles.textButtonWithWhiteSquare}>Se connecter avec Google</Text>
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