import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import NotificationHeader from '../elements/components/navigation/NotificationHeader';
import Notification from '../components/notification';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const { getId } = require('../modules/verifUser');

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function HistoryPage() {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [notifications, setNotifications] = useState([]);
    const user = useSelector((state) => state.user.value);
    const [error, setError] = useState();

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
                    response.demandes.map(x => {
                        if (x.status === "accepted" || x.status === "declined") {
                            setNotifications([...notifications, x]);
                        }
                    }
                    )
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setError("Une erreur s'est produite.");
            }
        }
        fetchData();
    }, [user.token]); // Ajouter user.token comme dépendance

    const allNotifications = notifications.map((x, i) => {
        let interlocuteur = '';
        let drt = 'Troquer'; // Valeur par défaut

        if (!x.type.troc) {
            if (id === x.possesseur) {
                interlocuteur = x.demandeur;
                drt = "Donner";
            } else {
                interlocuteur = x.possesseur;
                drt = "Recevoir";
            }
        }

        return (
            <Notification
                key={i}
                item={x.item}
                message={x.message[x.message.length - 1].message}
                interlocuteur={interlocuteur}
                statut={x.statut}
                type={drt}
                objProp={x.type.objetPropose}
                de={x.message[x.message.length - 1].de}
                a={x.message[x.message.length - 1].a}
                date={x.message[x.message.length - 1].date}
            />
        );
    });

    return (
        <View style={GlobalStyles.screenMainContainer}>
            <NotificationHeader />
            <View style={GlobalStyles.container}>
                <MainButton
                    title="Historique"
                    onPress={() => navigation.navigate('Connection')}
                />
            </View>
            {allNotifications}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 1
    },
    box: {
        width: 324,
        height: 54,
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 54,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    dot: {
        width: 10.25,
        height: 10,
        backgroundColor: '#8B85EF',
        borderRadius: 9999,
        position: 'absolute',
        left: 22.55,
        top: 21,
    },
    title: {
        position: 'absolute',
        left: 48.60,
        top: 16,
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        lineHeight: 16,
    },
    id: {
        position: 'absolute',
        left: 48.60,
        top: 32,
        opacity: 0.5,
        color: '#262B37',
        fontSize: 8,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 9,
    },
    date: {
        position: 'absolute',
        left: 241,
        top: 18,
        opacity: 0.5,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 14,
    },
});

