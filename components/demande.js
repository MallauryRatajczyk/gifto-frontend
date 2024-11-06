import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
const { formatDateToUserReadable } = require('../modules/getDate');


export default function CarteItem(props) {
    const navigation = useNavigation();
    const [itemName, setItemName] = useState("Exemple d'item");
    const [itemImage, setItemImage] = useState(null);
    const [idDemande, setIdDemande] = useState(null);
    const [itemDesc, setItemDesc] = useState("Description de l'exemple d'item.");
    const [interlocuteur, setInterlocuteur] = useState("Utilisateur Exemple");
    const [demande, setDemande] = useState([]); // Liste vide de demandes
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const [isValidate, setIsValidate] = useState(false)
    const user = useSelector((state) => state.user.value);


    useEffect(() => {
        async function findItem(id) {
            try {
                const fetched = await fetch(`http://192.168.1.81:3000/item/${id}`);
                if (!fetched.ok) throw new Error('Failed to fetch item');
                const response = await fetched.json();
                setItemName(response.item.name);
                setItemDesc(response.item.description);
                if (response.item.image) {
                    setItemImage(response.item.image)
                }
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        }

        //ICI mercredi
        async function getDemande(id) {
            try {
                const fetchedDemande = await fetch(`http://192.168.1.81:3000/demande/item/${id}`);
                if (!fetchedDemande.ok) throw new Error('Failed to fetch demandes');
                const responseDemande = await fetchedDemande.json();
                setIdDemande(responseDemande.demande._id)
                const fetchedDemandeur = await fetch(`http://192.168.1.81:3000/users/${responseDemande.demandes[0].demandeur}`);
                if (!fetchedDemande.ok) throw new Error('Failed to fetch user');
                const responseDemandeur = await fetchedDemandeur.json();
                setInterlocuteur(responseDemandeur.user.username)
                const demandesSansMessages = responseDemande.demandes.map((demande, i) => ({
                    key: i,
                    name: interlocuteur,
                    statut: demande.statut,
                    dateCreation: formatDateToUserReadable(new Date(demande.dateCreation)),
                }));
                setDemande(demandesSansMessages);
                console.log(responseDemande.demandes.find(x => x.statut === "accepted"))
                if (responseDemande.demandes.find(x => x.statut === "accepted")) {
                    setIsValidate(true)
                }
            } catch (error) {
                console.error("Error fetching demandes:", error);
            }
        }

        if (props.id) {
            findItem(props.id);
            getDemande(props.id);
        }

        setLoading(false); // Fin du chargement
    }, [props.id]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const validate = () => {
        const data = { statut: 'accepted', token: user.token }
        fetch(`http://192.168.1.81:3000/demande/read/${idDemande}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        setModalVisible(false)
        setIsValidate(true)
    }

    const refused = () => {
        const data = { statut: 'declined', token: user.token }
        fetch(`http://192.168.1.81:3000/demande/read/${idDemande}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        setModalVisible(false)
    }

    const viewMessage = () => {
        closeModal()
        navigation.navigate('Chat', { messages: props.message, interlocuteur })
    }

    const getStatut = (statut) => {
        switch (statut) {
            case "read": return ("lu");
            case "pending": return ("en attente");
            case "declined": return ("refusé");
            case "accepted": return ("validé");
        }
    }

    const request = ({ item }) => (
        <View style={[styles.requestContainer, item.statut === "declined" ? { backgroundColor: "#F08784" } : item.statut === "accepted" ? { backgroundColor: "#00BA88" } : {}]}>
            <Text style={styles.requestTitle}>Demande de: {item.name}</Text>
            <Text style={styles.requestDescription}>Statut: {getStatut(item.statut)}</Text>
            <Text style={styles.requestDate}>Date de création: {item.dateCreation}</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={viewMessage}>
                    <Text>Voir les messages</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Voir le profil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={refused}>
                    <Text>Refuser</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={validate}>
                    <Text>Valider</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <TouchableOpacity style={styles.container} onPress={openModal}>
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Fermer</Text>
                        </TouchableOpacity>

                        {/* Contenu du Modal */}
                        {loading ? (
                            <ActivityIndicator size="large" color="#8B85EF" />
                        ) : (
                            <FlatList
                                data={demande}
                                renderItem={request}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </View>
                </View>
            </Modal>

            {/* Carte principale */}
            <View style={styles.cardContainer}>
                <View style={[styles.card, isValidate ? styles.validate : styles.card]}>
                    <View style={styles.cardImageContainer}>
                        {itemImage !== "imageTest" ? <Image
                            style={styles.cardImage}
                            source={{ uri: itemImage }}
                        /> : <Image
                            style={styles.cardImage}
                            source={require("../assets/images/logoGifto.png")}
                        />}

                    </View>
                </View>
                <Text style={styles.cardTitle}>{itemName}</Text>
                <Text style={styles.cardDescription}>
                    {itemDesc}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        width: 336,
        height: 100,
        marginBottom: 20,
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    validate: {
        backgroundColor: '#00BA88'
    },
    cardImageContainer: {
        width: 100,
        height: 80,
        position: 'absolute',
        left: 14,
        top: 10,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    cardTitle: {
        position: 'absolute',
        top: 17,
        left: 130,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        color: '#262B37',
        fontSize: 18,
    },
    cardDescription: {
        width: 184,
        height: 49,
        position: 'absolute',
        top: 38,
        left: 130,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    },
    modalContainer: {
        width: '80%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
    },
    modalButton: {
        alignItems: 'center',
        backgroundColor: '#8B85EF',
        paddingVertical: 10,
        borderRadius: 25,
        marginBottom: 20,
    },
    modalButtonText: {
        color: '#F7FAFE',
        fontSize: 16,
    },

    // Styles pour les demandes
    requestContainer: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
    },
    requestTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    requestDescription: {
        fontSize: 14,
        color: '#666',
    },
    requestDate: {
        fontSize: 12,
        color: '#888',
    },
});
