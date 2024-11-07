import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toConnectUser } from '../reducers/user.js';

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function Connection({ navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Fonction de connexion
    const connect = (userObject) => {
        fetch(`${BACKEND_ADDRESS}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObject)
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    dispatch(toConnectUser({ token: data.token, email, username: data.username }));
                    navigation.navigate('TabNavigator');
                }
            })
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {/* Titre de la page */}
                <View style={styles.header}>
                    <Text style={styles.textContain}>Connexion</Text>
                </View>

                {/* Formulaire de connexion */}
                <View style={styles.formContainer}>
                    {/* Champ Email */}
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        style={styles.textInput}
                        placeholder="Adresse email"
                        autoComplete="email"
                        keyboardType="email-address"
                        textAlign={'center'}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />

                    {/* Champ Mot de passe */}
                    <TextInput
                        onChangeText={setPassword}
                        value={password}
                        style={styles.textInput}
                        placeholder="Mot de passe"
                        secureTextEntry
                        autoComplete="current-password"
                        textAlign={'center'}
                        textContentType="password"
                        autoCapitalize="none"
                    />
                    {/* Affichage de l'erreur */}
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {/* Bouton de connexion */}
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setError('');
                        connect({ email, password });
                    }}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableOpacity>

                    {/* Bouton retour */}
                    <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate('Authentification')}>
                        <Text style={styles.retourButtonText}>Retour</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F9', // Fond léger pour l'écran
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    textContain: {
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 28,
        color: "#8B85EF",
        fontWeight: 'bold',
        marginBottom: 30,
    },
    formContainer: {
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 50,
        width: 320,
        height: 50,
        marginVertical: 10,
        paddingHorizontal: 15,
        fontFamily: 'BalooBhaina2-Regular',
        fontSize: 16,
        backgroundColor: 'white',
        borderColor: '#8B85EF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    button: {
        backgroundColor: "#8B85EF",
        padding: 15,
        width: 320,
        borderRadius: 50,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textButton: {
        fontFamily: 'BalooBhaina2-Regular',
        color: 'white',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    retourButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    retourButtonText: {
        fontFamily: 'BalooBhaina2-Regular',
        color: "#8B85EF",
        fontSize: 16,
    },
});
