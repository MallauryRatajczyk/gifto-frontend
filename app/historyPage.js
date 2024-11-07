import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Notification from '../components/notification';
import GlobalStyles from '../elements/styles/GlobalStyles';
import HistoryHeader from '../elements/components/navigation/HistoryHeader';

const { getId } = require('../modules/verifUser');

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function HistoryPage() {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedID = await fetch(`${BACKEND_ADDRESS}/users/token/${user.token}`);
                const responseId = await fetchedID.json();
                setId(responseId.user.id);

                const fetched = await fetch(`${BACKEND_ADDRESS}/demande/mesdemandes/${responseId.user.id}`);
                const response = await fetched.json();

                if (response.error) {
                    setError(response.error);
                } else {
                    const filteredNotifications = response.demandes.filter(
                        (x) => x.statut === "accepted" || x.statut === "declined"
                    );
                    setNotifications(filteredNotifications);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setError("Une erreur s'est produite.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user.token]); // Ré-exécuter lorsque le token change

    const renderNotification = ({ item }) => {
        let interlocuteur = '';
        let drt = 'Troquer'; // Valeur par défaut

        if (!item.type.troc) {
            if (id === item.possesseur) {
                interlocuteur = item.demandeur;
                drt = "Donner";
            } else {
                interlocuteur = item.possesseur;
                drt = "Recevoir";
            }
        }

        return (
            <Notification
                key={item.id}
                item={item.item}
                message={item.message[item.message.length - 1].message}
                interlocuteur={interlocuteur}
                statut={item.statut}
                type={drt}
                objProp={item.type.objetPropose}
                de={item.message[item.message.length - 1].de}
                a={item.message[item.message.length - 1].a}
                date={item.message[item.message.length - 1].date}
            />
        );
    };

    return (
        <SafeAreaView style={GlobalStyles.screenMainContainer}>
            <HistoryHeader />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8B85EF" />
                    <Text style={styles.loadingText}>Chargement des notifications...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.notificationsContainer}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#8B85EF',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    notificationsContainer: {
        paddingBottom: 20,
    },
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F7FB',
    },
    box: {
        width: '100%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#8B85EF',
        borderRadius: 5,
        position: 'absolute',
        left: 20,
        top: 20,
    },
    title: {
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        marginLeft: 30,
        marginTop: 12,
    },
    date: {
        position: 'absolute',
        right: 20,
        top: 18,
        opacity: 0.5,
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        color: '#262B37',
    },
});
