import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import DemandeHeader from '../elements/components/navigation/DemandeHeader';
import Demande from '../components/demande';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function NotificationPage({ navigation }) {
    const [id, setId] = useState('');
    const [demande, setDemande] = useState([]);
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedID = await fetch(`http://192.168.1.81:3000/users/token/${user.token}`);
                const responseId = await fetchedID.json();
                setId(responseId.user.id);

                const fetched = await fetch(`http://192.168.1.81:3000/demande/mesdemandes/${responseId.user.id}`);
                const response = await fetched.json();

                if (response.error) {
                    setError(response.error);
                } else {
                    setDemande(response.demandes);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setError("Une erreur s'est produite.");
            }
        }
        fetchData();
    }, [user.token]); // Ajouter user.token comme dépendance

    const allDemande = demande.map((x, i) => {
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
            <Demande
                id={x._id}
                key={i}
                item={x.item}
                lastMessage={x.message[x.message.length - 1].message}
                message={x.message}
                interlocuteur={interlocuteur}
                possesseur={x.possesseur}
                demandeur={x.demandeur}
                statut={x.statut}
                type={drt}
                objProp={x.type.objetPropose}
                de={x.message[x.message.length - 1].de}
                a={x.message[x.message.length - 1].a}
                date={x.message[x.message.length - 1].date}
            />)
    });

    return (
        <View style={GlobalStyles.screenMainContainer}>
            <DemandeHeader />
            <View style={{ flex: 1 }}>
                {allDemande}
            </View>
        </View>
    );
}


