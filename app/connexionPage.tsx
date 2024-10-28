import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type HomeScreenProps = {
    navigation: NavigationProp<ParamListBase>
};

export default function Connection({ navigation }: HomeScreenProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        paddingTop: 10,
                        alignItems: "center",
                        marginBottom: 25
                    }}
                >
                    <Image source={require('../assets/images/logoGifto.png')} style={styles.logoConnection} />
                </View>
                <View style={{
                    alignItems: "center",
                    marginBottom: 25
                }}>
                    <Text style={styles.textContain}>Connexion</Text>
                    <TextInput
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        style={styles.textInput}
                        placeholder="Adresse Email"
                        autoComplete="email"
                        keyboardType="email-address"
                        textAlign={'center'}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />
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
                    />
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate('Authentification')} >
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