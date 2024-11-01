import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import MainButton from '../elements/components/buttons/MainButton';
import Colors from '../elements/styles/Colors';
import Typography from "../elements/styles/Typography";

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function RechercheTrocScreen({ navigation }) {
    const [chercher, setChercher] = useState('');
    const [resultats, setResultats] = useState([]);
    const [itemRecommande, setItemRecommande] = useState([]);
    const [montreResult, setMontreResult] = useState(false);

    useEffect(() => {
        async function itemRandom() {
            const fetched = await fetch(`${BACKEND_ADDRESS}/item`);
            const response = await fetched.json();
            if (response) {
                // Filtre les items où troc est true
                const itemsTroc = response.item.filter(articl => articl.troc === true);
                const tableauMelange = itemsTroc.sort((a, b) => Math.random() - 0.5);
                if (tableauMelange.length == 1 || tableauMelange.length == 2) {
                    setItemRecommande(tableauMelange);
                } else if (tableauMelange.length >= 3) {
                    setItemRecommande(tableauMelange.slice(0, 3));
                }
            }
        }
        itemRandom(); // Appelle la fonction pour charger les articles recommandés au démarrage
    }, []);

    const handleSearch = () => {
        if (chercher.trim() === '') return;
        fetch(`${BACKEND_ADDRESS}/item`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Filtre les items où troc est true
                const filtreTrocTrue = data.item.filter(item => item.troc === true);
                const resultatsFiltres = filtreTrocTrue.filter(item =>
                    item.name.toLowerCase().includes(chercher.toLowerCase())
                );
                setResultats(resultatsFiltres);
                setMontreResult(true);
            })
            .catch(error => {
                console.error(error);
                setMontreResult(true); // Afficher les résultats même en cas d'erreur
                setResultats([]);
            });
    }

    const handlePress = () => {
        navigation.navigate('HomePage');
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={styles.screenMainContainer}>
                <Text style={[styles.coloredHeader, styles.headerTextWhite]} >Troquer</Text>
                <View style={styles.searchContainer}>
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
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <TouchableOpacity style={styles.item} onPress={handlePress}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.image}
                                            />
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.titleTextBlack}>Recommandations</Text>
                            <FlatList
                                data={itemRecommande}
                                keyExtractor={(item) => item._id.toString()}
                                horizontal
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <TouchableOpacity style={styles.item} onPress={handlePress}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.image}
                                            />
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </>
                    )}
                </View>
                <View>
                    <Text style={styles.titleTextBlack}>Ajouter un item</Text>
                    <Text>Vous cherchez à échanger des articles avec quelque chose qui vous plait ?</Text>
                    <View>
                        <MainButton
                            title="Créer !"
                            onPress={() => navigation.navigate('CreeTrocScreen')}
                            normalBackgroundColor={Colors.purpleColor}
                            clickedBackgroundColor={Colors.textColor}    // Clicked state background color
                        />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({

    screenMainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 36,
        justifyContent: 'top', //top alignment for all content
        align: 'center',
        display: 'flex',
    },
    coloredHeader: {
        backgroundColor: Colors.purpleColor, // Default color
        borderBottomRightRadius: 60,
        paddingTop: 60,
        marginBottom: 36,
        alignItems: 'left',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'left',
        height: 140,
    },
    headerTextWhite: {
        ...Typography.h1,
        color: Colors.whiteColor,
        paddingVertical: 24,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: -30,
    },
    titleTextBlack: {
        ...Typography.h2,
        color: Colors.textColor,
        paddingVertical: 12,
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
});    