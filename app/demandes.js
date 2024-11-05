import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const BACKEND_ADDRESS = "http://192.168.1.81:3000"

export default function Demandes({ navigation }) {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [demandes, setDemandes] = useState([]);
    const id = "pierre"

    async function redirect(demande) {
        const fetched = await fetch(`${BACKEND_ADDRESS}/demande/${demande}`);
        const response = await fetched.json();
        if (response.result) {
            navigation.navigate('Chat', { message: response.demande })
        } else {
            console.log("erreur redirect")
        }

    }

    useEffect(() => {
        async function fetchData() {
            const fetched = await fetch(`${BACKEND_ADDRESS}/demande/mesdemandes/${id}`);
            const response = await fetched.json();
            if (response.error) {
                setError(response.error)
            } else {
                setDemandes(response.demandes)
            }
        }
        fetchData()

    }, []);

    const allDemande = demandes.map((x, i) => {

        return (<TouchableOpacity key={i} style={{ flex: 1, flexDirection: "row" }} onPress={() => redirect(x._id)}><Text>DE {x.expediteur} : {x.message} A {x.destinataire}</Text>
        </TouchableOpacity>)
    })

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
                <Text>Demande</Text>
                {allDemande}
                <View>
                    <Text>Champ de texte</Text>
                </View>
                <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate('Authentification')} >
                    <Text style={styles.retourButtonText}>Retour</Text>
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