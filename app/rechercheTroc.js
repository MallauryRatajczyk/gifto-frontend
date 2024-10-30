import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Platform, ScrollViewComponent } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

export default function RechercheTrocScreen({ navigation }) {
    const [chercher, setChercher] = useState('');
    const [resultats, setResultats] = useState([]);

    const handleSearch = () => {
        fetch(`http://localhost:3000/objet/${chercher}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setResultats(data);
                }
            })
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <TextInput
                    onChangeText={(value) => setChercher(value)}
                    value={chercher}
                    style={styles.textInput}
                    placeholder="Chercher"
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Rechercher</Text>
                </TouchableOpacity>
                <View>Recommandations
                    <Image></Image>
                    <ScrollViewComponent></ScrollViewComponent>
                </View>
                <View>Ajouter un article
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreationTroc')}>
                        <Text style={styles.buttonText}>Créer</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    searchButton: {

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
});    
