//WE DON'T NEED THIS FILE ANYMORE


import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toConnectUser } from '../reducers/user'

import { GiftoSymbol } from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';

export default function Connection({ navigation }) {
    // Initialize the dispatch function for Redux actions
    const dispatch = useDispatch(); 

    // Define state variables for email, password, and error messages
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                {/* Logo Section */}
                <View
                    style={{
                        paddingTop: 10,
                        alignItems: "center",
                        marginBottom: 25
                    }}
                >
                    <Image source={require('../assets/images/logoGifto.png')} style={styles.logoConnection} />
                </View>

                {/* Login Form Section */}
                <View style={{
                    alignItems: "center",
                    marginBottom: 25
                }}>
                    <Text style={styles.textContain}>Connexion</Text>

                    {/* Email Input Field */}
                    <TextInput
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        style={styles.textInput}
                        placeholder="Adresse email ou nom d'utilisateur"
                        autoComplete="email"
                        keyboardType="email-address"
                        textAlign={'center'}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />

                    {/* Password Input Field */}
                    <TextInput
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        style={styles.textInput}
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        textAlign={'center'}
                        textContentType="password"
                        keyboardType="default"
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    {error && <Text>{error}</Text>}

                    {/* Login Button */}
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.textButton} onPress={() => {
                            setError('')
                            connect({ email, password })
                        }}>Se connecter</Text>
                    </TouchableOpacity>

                    {/* Back Button */}
                    <TouchableOpacity style={styles.retourButton} 
                    onPress={() => navigation.navigate('Authentification')} >
                        <Text style={styles.retourButtonText}>Retour</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: 20,
    },

    button: {
        backgroundColor: "#8B85EF",
        padding: 10,
        width: 320,
        height: 40,
        borderRadius: 50,
        margin: 5
    },
    textButton: {
        fontFamily: 'BalooBhaina2-Regular',
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 50,
        width: 320,
        height: 40,
        margin: 10,
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 15,
        alignItems: "center",
        backgroundColor: "white"
    },
    nomEtPrenomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nomEtPrenomInput: {
        borderWidth: 1,
        borderRadius: 50,
        width: 150,
        height: 40,
        margin: 10,
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 15,
        alignItems: "center",
        backgroundColor: "white"
    },
    usernameInput: {
        borderWidth: 1,
        borderRadius: 50,
        width: 220,
        height: 40,
        margin: 10,
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 15,
        alignItems: "center",
        backgroundColor: "white"
    },
    ageInput: {
        borderWidth: 1,
        borderRadius: 50,
        width: 80,
        height: 40,
        margin: 10,
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 15,
        alignItems: "center",
        backgroundColor: "white"
    },
    retourButton: {
        margin: 15
    },
    retourButtonText: {
        fontFamily: 'BalooBhaina2-Regular',
        color: "#8B85EF"
    }
});