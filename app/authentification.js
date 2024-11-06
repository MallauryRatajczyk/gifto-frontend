import { Text, View, Image, StyleSheet, TouchableOpacity, Button, Alert, TextInput } from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser'; // For opening web browsers within the app
import * as Application from 'expo-application'; // For accessing application properties
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

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function Authentification({ navigation }) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '887056109032-ja5jqdiubjk4h8ppn2e2mu24q0v5u4io.apps.googleusercontent.com', // Replace YOUR_CLIENT_ID later on
        redirectUri: AuthSession.makeRedirectUri({
            useProxy: true, // Utilisez true si vous êtes en développement avec Expo Go / Use Expo's proxy for redirect URI in development
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
                    dispatch(toConnectUser({ token: data.token, email, username: data.username }));
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
        <SafeAreaProvider style={GlobalStyles.appStyle}>
            <SafeAreaView style={GlobalStyles.screenHomeContainer}>
                
                {/* Header section with logo and welcome text */}
                <View style={GlobalStyles.IntroLogoContainer}>

                    {/* App logo */}
                    <GiftoSymbol width={100} height={100} />

                    {/* Welcome message */}
                    <Text style={GlobalStyles.headerTextPurple} marginTop={-24}>Connexion</Text>

                </View>

                {/* Login Form Section */}
                <View>
                    {/* Email Input Field */}
                    <InputCard
                        title="Email"
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        placeholder="johndoe@gmail.com"
                        autoComplete="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                    />

                    {/* Password Input Field */}
                    <PasswordInputCard
                        title="Mot de passe"
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        placeholder="Mot de passe"
                    />
                    {/* Display error message if any */}
                    {error && <Text style={GlobalStyles.errorText}>{error}</Text>}

                </View>

                {/* Login Button */}
                <MainButton
                    title="Se connecter"
                    onPress={() => {
                        setError('');
                        connect({ email, password });
                    }}
                    normalBackgroundColor={Colors.purpleColor}
                    clickedBackgroundColor={Colors.redColor}
                />


                {/* Button to navigate to the 'Inscription' (Sign Up) screen */}
                <SecondaryButton
                    title="S'inscrire"
                    onPress={() => navigation.navigate('Inscription')}
                    normalBackgroundColor={Colors.backgroundColor}
                    clickedBackgroundColor={Colors.redColor}
                    normalStrokeColor={Colors.redColor}
                    clickedStrokeColor={Colors.redColor}
                    normalTextColorStyle={GlobalStyles.buttonTextRed}
                    clickedTextColorStyle={GlobalStyles.buttonTextWhite}
                />
                <View style={GlobalStyles.LoginIconsContainer}>
                    {/* Button to initiate Google Sign-In */}
                    <CircleButton
                        icon={GoogleIcon}
                        onPress={() => {promptAsync();}}
                        normalBackgroundColor={Colors.backgroundColor}
                        clickedBackgroundColor={Colors.purpleColor}
                        normalStrokeColor={Colors.shadow}
                        clickedStrokeColor={Colors.purpleColor}
                        normalIconColor={Colors.purpleColor}
                        clickedIconColor={Colors.whiteColor}
                    />

                    {/* Button to initiate Apple Sign-In */}
                    <CircleButton
                        icon={AppleIcon}
                        onPress={() => {promptAsync();}}
                        normalBackgroundColor={Colors.backgroundColor}
                        clickedBackgroundColor={Colors.purpleColor}
                        normalStrokeColor={Colors.shadow}
                        clickedStrokeColor={Colors.purpleColor}
                        normalIconColor={Colors.purpleColor}
                        clickedIconColor={Colors.whiteColor}
                    />

                    {/* Button to initiate Windows Sign-In */}
                    <CircleButton
                        icon={WindowsIcon}
                        onPress={() => {promptAsync();}}
                        normalBackgroundColor={Colors.backgroundColor}
                        clickedBackgroundColor={Colors.purpleColor}
                        normalStrokeColor={Colors.shadow}
                        clickedStrokeColor={Colors.purpleColor}
                        normalIconColor={Colors.purpleColor}
                        clickedIconColor={Colors.whiteColor}
                    />

                </View>
                
            </SafeAreaView>
        </SafeAreaProvider >
    );
}

