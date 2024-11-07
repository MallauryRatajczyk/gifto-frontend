import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const { formatDateToUserReadable } = require('../modules/getDate');

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function CarteItem(props) {
    const navigation = useNavigation();
    const [itemName, setItemName] = useState("Exemple d'item");
    const [itemImage, setItemImage] = useState(null);
    const [idDemande, setIdDemande] = useState([]);
    const [itemDesc, setItemDesc] = useState("Description de l'exemple d'item.");
    const [interlocuteur, setInterlocuteur] = useState([]);
    const [demande, setDemande] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isValidate, setIsValidate] = useState(false);
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        async function findItem(id) {
            try {
                const fetched = await fetch(`${BACKEND_ADDRESS}/item/${id}`);
                if (!fetched.ok) throw new Error('Failed to fetch item');
                const response = await fetched.json();
                setItemName(response.item.name);
                setItemDesc(response.item.description);
                if (response.item.image) {
                    setItemImage(response.item.image);
                }
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        }

        async function getDemande(id) {
            try {
                const fetchedDemande = await fetch(`${BACKEND_ADDRESS}/demande/item/${id}`);
                if (!fetchedDemande.ok) throw new Error('Failed to fetch demandes');
                const responseDemande = await fetchedDemande.json();
                console.log("responseDemande", responseDemande)
                console.log("responseDemande", responseDemande.demandes)
                if (responseDemande.demandes) {
                    for (let elem of responseDemande.demandes)
                        setIdDemande([...idDemande, elem._id]);
                }
                setDemande(responseDemande.demandes);
                // Si une demande a le statut "accepted", on met à jour l'état de validation
                if (responseDemande.demandes.find(x => x.statut === "accepted")) {
                    setIsValidate(true);
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

    // Récupérer l'interlocuteur (une seule fois pour chaque demandeur unique)
    useEffect(() => {
        const fetchInterlocuteur = async (demandeurId) => {
            try {
                const fetchedDemandeur = await fetch(`${BACKEND_ADDRESS}/users/${demandeurId}`);
                if (!fetchedDemandeur.ok) throw new Error('Failed to fetch user');
                const responseDemandeur = await fetchedDemandeur.json();
                setInterlocuteur([...interlocuteur, responseDemandeur.user.username]);
            } catch (error) {
                console.error("Error fetching interlocuteur:", error);
            }
        };

        // Si on a des demandes, on récupère l'interlocuteur pour chaque demandeur
        if (demande.length > 0) {
            // On récupère l'interlocuteur pour le premier demandeur (par exemple, on peut étendre cette logique)
            for (let elem of demande) {
                fetchInterlocuteur(elem.demandeur);
            }

        }
    }, [demande]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const validate = (i) => {
        const data = { statut: 'accepted', token: user.token };
        fetch(`${BACKEND_ADDRESS}/demande/read/${idDemande[i]}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        setModalVisible(false);
        setIsValidate(true);
    };

    const refused = (i) => {
        const data = { statut: 'declined', token: user.token };
        fetch(`${BACKEND_ADDRESS}/demande/read/${idDemande[i]}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        setModalVisible(false);
    };

    const getStatut = (statut) => {
        switch (statut) {
            case "read": return ("lu");
            case "pending": return ("en attente");
            case "declined": return ("refusé");
            case "accepted": return ("validé");
        }
    };

    const lesDemandes = demande.map((x, i) => {

        let initialMessages = []
        for (let elem of x.message) {
            initialMessages.push(
                { _id: 1, text: String(elem.message) || "Message vide", createdAt: new Date(elem.date), user: { _id: 2, name: 'User 2' } },
            )
        }
        return (
            <View key={i} style={[styles.requestContainer, x.statut === "declined" ? { backgroundColor: "#F08784" } : x.statut === "accepted" ? { backgroundColor: "#00BA88" } : {}]}>
                <Text style={styles.requestTitle}>Demande de: {interlocuteur[i]}</Text>
                <Text style={styles.requestDescription}>Statut: {getStatut(x.statut)}</Text>
                <Text style={styles.requestDate}>Date de création: {formatDateToUserReadable(new Date(x.dateCreation))}</Text>

                {/* Boutons déplacés sous la description */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {
                        closeModal();
                        navigation.navigate('Chat', {
                            initialMessages: initialMessages, // messages déjà récupérés
                            interlocuteur: interlocuteur[i],   // nom de l'interlocuteur
                            idInterlocuteur: x.demandeur,      // id du demandeur
                            myId: x.possesseur,                // id du possesseur de l'item
                        });
                    }} style={styles.button}>
                        <Text style={styles.buttonText}>Voir les messages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Voir le profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refused(i)} style={[styles.button, { backgroundColor: "#F08784" }]}>
                        <Text style={styles.buttonText}>Refuser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => validate(i)} style={[styles.button, { backgroundColor: "#00BA88" }]}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    });

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

                        {/* ScrollView pour le contenu défilant */}
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#8B85EF" />
                            ) : (
                                lesDemandes // Liste des demandes avec les boutons et informations
                            )}
                        </ScrollView>
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
    // Styles pour le modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    },

    // Container du modal ajusté pour une taille flexible
    modalContainer: {
        width: '80%', // 80% de la largeur de l'écran
        maxHeight: '80%',  // Limiter la hauteur du modal à 80% de l'écran
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        overflow: 'hidden',  // Masque les éléments qui débordent
    },

    // Container à l'intérieur du ScrollView pour ajouter de l'espace et du padding
    scrollContent: {
        paddingBottom: 20, // Ajoute un peu d'espace en bas pour ne pas que le contenu touche le bord
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
    buttonContainer: {
        marginTop: 10, // Ajout de marge pour espacer les boutons du texte
        flexDirection: 'column', // Organiser les boutons sous la demande
        alignItems: 'center', // Centrer les boutons
    },

    button: {
        backgroundColor: '#8B85EF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 10, // Espacement entre les boutons
        width: '80%', // Optionnel, peut ajuster la largeur si nécessaire
    },

    buttonText: {
        color: '#F7FAFE',
        fontSize: 16,
        textAlign: 'center',
    }

});
