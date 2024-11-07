import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Application from 'expo-application';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

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
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/logoWithoutGifto.png')} style={styles.logoConnection} />
                    <Text style={styles.h1}>Bienvenue sur Gifto</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.purpleSquare} onPress={() => navigation.navigate('ConnexionPage')} >
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteSquare} onPress={() => navigation.navigate('Inscription')} >
                        <Text style={styles.textButtonWithWhiteSquare}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.whiteSquare, !request && styles.disabledButton]}
                        disabled={!request}
                        onPress={() => promptAsync()}
                    >
                        <Text style={styles.textButtonWithWhiteSquare}>Se connecter avec Google</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F9', // Ajout d'un fond léger
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoConnection: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    h1: {
        color: "#8B85EF",
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'BalooBhaina2-Regular',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    purpleSquare: {
        backgroundColor: "#8B85EF",
        width: 320,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    whiteSquare: {
        backgroundColor: "white",
        width: 320,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    disabledButton: {
        backgroundColor: "#f0f0f0", // Désactive le bouton s'il n'y a pas de requête
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
    },
});
