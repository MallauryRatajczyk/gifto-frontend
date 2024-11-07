import { Text, View, Image, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Application from 'expo-application';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toConnectUser } from '../reducers/user';
import { GiftoSymbol, GoogleIcon, AppleIcon, WindowsIcon } from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';

import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import CircleButton from '../elements/components/buttons/CircleButton';
import InputCard from '../elements/components/cards/InputCard';
import PasswordInputCard from '../elements/components/cards/PasswordInputCard';

//REMARQUE : NOUS DEVONS METTRE À JOUR LES LIENS DU BOUTON CERCLE (WINDOWS ET APPLE) !!!!!!!

const BACKEND_ADDRESS = "http://192.168.1.3:3000"

export default function Authentification({ navigation }) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '887056109032-ja5jqdiubjk4h8ppn2e2mu24q0v5u4io.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({
            useProxy: true, // Utilisez true si vous êtes en développement avec Expo Go
        }),
    });

    // Initialize the dispatch function for Redux actions
    const dispatch = useDispatch();

    // Define state variables for email, password, and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle user login
    const connect = (userObject) => {
        fetch(`${BACKEND_ADDRESS}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObject)
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else { // If login is successful, dispatch the user data to the Redux store
                    dispatch(toConnectUser({ 
                        token: data.token, 
                        email: data.email, 
                        username: data.username 
                    }));
                    navigation.navigate('TabNavigator') // Navigate to the main application screen
                }
            })
    }

    // Handle the response from Google authentication
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
                <View style={{ paddingTop: 10, alignItems: "center", }}>
                    <Image source={require('../assets/images/logoWithoutGifto.png')} style={styles.logoConnection} />
                    <Text style={styles.h1}>Bienvenue sur Gifto</Text>
                </View>
                <TouchableOpacity style={styles.purpleSquare} onPress={() => navigation.navigate('Connection')} >
                    <Text style={styles.textButton}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteSquare} onPress={() => navigation.navigate('Inscription')} >
                    <Text style={styles.textButtonWithWhiteSquare}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteSquare} disabled={!request} onPress={() => {
                    promptAsync();
                }} >
                    <Text style={styles.textButtonWithWhiteSquare}>Se connecter avec Google</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
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