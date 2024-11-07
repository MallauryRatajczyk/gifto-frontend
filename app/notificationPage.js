import React from 'react';
import { View } from 'react-native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import NotificationHeader from '../elements/components/navigation/NotificationHeader';
import Notification from '../components/notification';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


const BACKEND_ADDRESS = "http://192.168.1.81:3000"

export default function NotificationPage({ navigation }) {
  const [id, setId] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('')
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedID = await fetch(`${BACKEND_ADDRESS}/users/token/${user.token}`);
        const responseId = await fetchedID.json();
        setId(responseId.user.id);

        const fetched = await fetch(`${BACKEND_ADDRESS}/demande/mesdemandes/${responseId.user.id}`);
        const response = await fetched.json();
        console.log(responseId, response)
        if (response.error) {
          setError(response.error);
        } else {
          setNotifications(response.demandes);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Une erreur s'est produite.");
      }
    }
    fetchData();
  }, [user.token]); // Ajouter user.token comme dépendance

  const allNotifications = notifications.map((x, i) => {
    console.log(x)
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
      />
    );
  });

  return (
    <View style={GlobalStyles.screenMainContainer}>
      <NotificationHeader />
      <View >
        <MainButton
          title="Historique"
          onPress={() => navigation.navigate('HistoryPage')}
        />
        <MainButton
          title="Demandes reçus"
          onPress={() => navigation.navigate('Demande')}
        />
      </View>
      {allNotifications}
    </View>
  );
}


