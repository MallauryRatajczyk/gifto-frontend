import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { NavigationProp, ParamListBase } from "@react-navigation/native";


export default function Inscription({ navigation }) {
    const [email, setEmail] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [password, setPassword] = useState('')
    const [verifPassword, setVerifPassword] = useState('')
    const [username, setUsername] = useState('')
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show)
    }

    const changeDate = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate)
        } else {
            toggleShow()
        }
    }

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
                    flex: 1,
                    alignItems: "center",
                }}>
                    <Text style={styles.textContain}>Inscription</Text>
                    <TextInput
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        style={styles.textInput}
                        placeholder="Adresse Email"
                        autoComplete="email"
                        keyboardType="email-address"
                        textAlign={'center'}
                        autoCapitalize="none"
                    />
                    <View style={styles.twoContainer}>
                        <TextInput
                            onChangeText={(value) => setNom(value)}
                            value={nom}
                            style={styles.nomEtPrenomInput}
                            placeholder="NOM"
                            autoComplete="family-name"
                            keyboardType="default"
                            textAlign={'center'}
                            autoCapitalize="characters"
                        />
                        <TextInput
                            onChangeText={(value) => setPrenom(value)}
                            value={prenom}
                            style={styles.nomEtPrenomInput}
                            placeholder="Prénom"
                            autoComplete="given-name"
                            keyboardType="default"
                            textAlign={'center'}
                            autoCapitalize="words"
                        />
                    </View>
                    <View style={styles.twoContainer}>
                        <TextInput
                            onChangeText={(value) => setUsername(value)}
                            value={username}
                            style={styles.usernameInput}
                            placeholder="Nom d'utilisateur"
                            autoComplete="username"
                            keyboardType="default"
                            textAlign={'center'}
                        />
                        <TouchableOpacity
                            style={styles.ageInput}
                            onPress={() => setShow(true)}
                        >

                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={changeDate}
                            />
                        )}
                        <Pressable
                            onPress={toggleShow}>
                            <TextInput
                                onChangeText={(value) => setUsername(value)}
                                value={date}
                                style={styles.usernameInput}
                                placeholder="Nom d'utilisateur"
                                autoComplete="username"
                                keyboardType="default"
                                textAlign={'center'} />
                        </Pressable>



                    </View>
                    <TextInput
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        style={styles.textInput}
                        placeholder="Mot de passe"
                        autoComplete="new-password"
                        textAlign={'center'}
                        keyboardType="default"
                        secureTextEntry={true}
                    />
                    <TextInput
                        onChangeText={(value) => setVerifPassword(value)}
                        value={verifPassword}
                        style={styles.textInput}
                        placeholder="Confirmer le mot de passe"
                        autoComplete="new-password"
                        textAlign={'center'}
                        keyboardType="default"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.textButton}>S'inscrire</Text>
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
        borderRadius: 50
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
        backgroundColor: "white",
    },
    twoContainer: {
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
        backgroundColor: "white",
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
        backgroundColor: "white",
        justifyContent: 'center'
    },
    retourButton: {
        margin: 15
    },
    retourButtonText: {
        fontFamily: 'BalooBhaina2-Regular',
        color: "#8B85EF"
    },
    ageInputText: {
        fontFamily: 'BalooBhaina2-Regular',
        color: "gray",
        textAlign: 'center'
    }
});