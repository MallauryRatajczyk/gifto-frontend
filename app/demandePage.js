import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../elements/styles/GlobalStyles';
import DemandeHeader from '../elements/components/navigation/DemandeHeader';
import Demande from '../components/demande';

export default function NotificationPage({ navigation }) {

    const [item, setItem] = useState([]);
    const [error, setError] = useState('');
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedID = await fetch(`http://192.168.1.81:3000/users/token/${user.token}`);
                const responseId = await fetchedID.json();
                // Pour tests, on remplace par un ID fixe 671fb98fe3a8ffe9c0ea2697 / 672386d302d94d974fe999b2
                const fetched = await fetch(`http://192.168.1.81:3000/item/user/${responseId.user.id}`);
                //const fetched = await fetch(`http://192.168.1.81:3000/item/user/672386d302d94d974fe999b2`);
                const response = await fetched.json();
                if (response.error) {
                    setError(response.error);
                } else {
                    setItem(response.item);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setError("Une erreur s'est produite.");
            }
        }
        fetchData();
    }, [user.token]); // Ajouter user.token comme dépendance

    const allItems = item.map((x, i) => (
        <Demande
            id={x._id}
            key={i}
        />
    ));

    return (
        <View style={GlobalStyles.screenMainContainer}>
            <DemandeHeader />
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {allItems}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: 20,  // Optionnel, pour ajouter de l'espace en bas du contenu
        paddingHorizontal: 10,  // Optionnel, pour ajouter de l'espace à gauche et à droite
    }
});
