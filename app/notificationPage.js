import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import { useState, useEffect } from 'react';
import NotificationHeader from '../elements/components/navigation/NotificationHeader';
import Notification from '../components/notification'

const BACKEND_ADDRESS = "http://192.168.86.114:3000";

export default function SettingsPage() {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [notification, setNotification] = useState([]);


  async function redirect(demande) {
    const fetched = await fetch(`${BACKEND_ADDRESS}/demande/${demande}`);
    const response = await fetched.json();
    const fetchedID = await fetch(`${BACKEND_ADDRESS}/user/${demande}`)
    if (response.result) {
      navigation.navigate('Chat', { message: response.demande })
    } else {
      console.log("erreur redirect")
    }
  }

  useEffect(() => {
    async function fetchData() {
      const fetched = await fetch(`${BACKEND_ADDRESS}/demande/mesdemandes/${id}`);
      const response = await fetched.json();
      if (response.error) {
        setError(response.error)
      } else {
        setNotification(response.demandes)
      }
    }
    fetchData()
  }, [])

  const allNotifications = notification.map((x, i) => {

    return (<TouchableOpacity key={i} style={styles.container}>
      <View style={styles.box}>
        <View style={styles.dot} />
        <Text style={styles.title}>{x.message}</Text>
        <Text style={styles.id}>{x.dateCreation}</Text>
        <Text style={styles.date}>{x.expediteur}</Text>
      </View>
    </TouchableOpacity>)
  })

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
      <Notification />
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
