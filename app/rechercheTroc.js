import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

export default function RechercheTrocScreen({ navigation }) {
    const [chercher, setChercher] = useState('');
    const [resultats, setResultats] = useState([]);
    const [itemRecommande, setItemRecommande] = useState([]);
    const [montreResult, setMontreResult] = useState(false);

    useEffect(() => {
        itemRandom(); // Appelle la fonction pour charger les articles recommandés au démarrage
    }, []);

    const handleSearch = () => {
        if (chercher.trim() === '') return;
        fetch(`http://localhost:3000/item/${chercher}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setResultats(data);
                    setMontreResult(true);
                }
            })
    }

    const itemRandom = () => {
        fetch('http://localhost:3000/item')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const tableauMelange = data.sort((a, b) => Math.random() - 0.5);
                    if (tableauMelange.length == 1 || tableauMelange.length == 2) {
                        setItemRecommande(tableauMelange);
                    } else if (tableauMelange.length >= 3) {
                        setItemRecommande(tableauMelange.slice(0, 3));
                    }
                }
            })
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.textContain} >Troquer</Text>
                <View style={{
                    alignItems: "center",
                    marginBottom: 25
                }}>
                    <TextInput
                        onChangeText={(value) => setChercher(value)}
                        value={chercher}
                        style={styles.textInput}
                        placeholder="Rechercher"
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.buttonText}>🔍</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                        paddingTop: 10,
                        alignItems: "center",
                        marginBottom: 25
                    }}>
                    {montreResult && resultats.length === 0 && (
                        <Text>Aucun résultat trouvé.</Text>
                    )}
                    {montreResult && resultats.length > 0 ? (
                        <>
                            <Text>Résultats de recherche :</Text>
                            <FlatList
                                data={resultats}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <Image
                                            source={{ uri: item.imageUrl }}
                                            style={styles.image}
                                        />
                                        <Text>{item.name}</Text>
                                    </View>
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <Text>Recommandations</Text>
                            <FlatList
                                data={itemRecommande}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <Image
                                            source={{ uri: item.imageUrl }}
                                            style={styles.image}
                                        />
                                    </View>
                                )}
                            />
                        </>
                    )}
                </View>
                <View>
                    <Text>Ajouter un item</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Authentification')}>
                        <Text style={styles.buttonText}>Créer</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
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
});    