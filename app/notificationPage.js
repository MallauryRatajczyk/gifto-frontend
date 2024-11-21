import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import NotificationHeader from '../elements/components/navigation/NotificationHeader';
import Notification from '../components/notification';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function NotificationPage({ navigation }) {
  const [id, setId] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.value);

  // Fonction pour récupérer l'ID de l'utilisateur et les notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userResponse = await fetch(`${BACKEND_ADDRESS}/users/token/${user.token}`);
        const userData = await userResponse.json();
        setId(userData.user.id);

        const notificationsResponse = await fetch(`${BACKEND_ADDRESS}/demande/mesdemandes/${userData.user.id}`);
        const notificationsData = await notificationsResponse.json();

        if (notificationsData.error) {
          setError(notificationsData.error);
        } else {
          setNotifications(notificationsData.demandes);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications:", error);
        setError("Une erreur s'est produite lors de la récupération des notifications.");
      }
    };

    fetchNotifications();
  }, [user.token]);

  // Fonction pour générer la vue des notifications
  const renderNotifications = () => {
    return notifications.map((notification, index) => {
      const { _id, item, message, possesseur, demandeur, statut, type } = notification;
      const lastMessage = message[message.length - 1];
      const interlocuteur = possesseur === id ? demandeur : possesseur;
      const drt = type && !type.troc ? (possesseur === id ? "Donner" : "Recevoir") : 'Troquer';
      return (
        <Notification
          key={index}
          id={_id}
          item={item}
          lastMessage={lastMessage.message}
          message={message}
          interlocuteur={interlocuteur}
          possesseur={possesseur}
          demandeur={demandeur}
          statut={statut}
          type={drt}
          de={lastMessage.de}
          a={lastMessage.a}
          date={lastMessage.date}
        />
      );
    });
  };

  return (
    <View style={GlobalStyles.screenMainContainer}>
      {/* Header */}
      <NotificationHeader />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <MainButton title="Historique" onPress={() => navigation.navigate('HistoryPage')} />
        <MainButton title="Demandes reçues" onPress={() => navigation.navigate('Demande')} />
      </View>

      {/* Notifications or Error Message */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        renderNotifications()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
  },
  errorContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8D7DA',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#721C24',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
