import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux';
import { toConnectUser } from '../reducers/user'

const { dateRequired } = require('../modules/dateRequirement')

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function Inscription({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [password, setPassword] = useState('')
  const [verifPassword, setVerifPassword] = useState('')
  const [username, setUsername] = useState('')
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState('');

  const toggleShow = () => {
    setDate(dateRequired())
    setShow(!show)
  }

  const register = (userObject) => {
    fetch(`${BACKEND_ADDRESS}/users/enregistrer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObject)
    }).then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          dispatch(toConnectUser({ token: data.token, email, username }));
          navigation.navigate('TabNavigator')
        }
      })
  }

  const changeDate = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        setShow(false); // Ferme le date picker après la sélection
      }
    } else {
      setShow(false); // Ferme le date picker si l'utilisateur annule
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 10,
            alignItems: "center",
            marginBottom: 25
          }}
        >
          <Image source={require('../assets/images/logoGifto.png')} style={styles.logoConnection} />
        </View>

        <View style={{
          flex: 1,
          alignItems: "center",
        }}>
          <Text style={styles.textContain}>Inscription</Text>
          <TextInput
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.textInput}
            placeholder="Adresse Email"
            autoComplete="email"
            keyboardType="email-address"
            textAlign={'center'}
            autoCapitalize="none"
          />
          <View style={styles.twoContainer}>
            <TextInput
              onChangeText={(value) => setNom(value)}
              value={nom}
              style={styles.nomEtPrenomInput}
              placeholder="NOM"
              autoComplete="family-name"
              keyboardType="default"
              textAlign={'center'}
              autoCapitalize="characters"
            />
            <TextInput
              onChangeText={(value) => setPrenom(value)}
              value={prenom}
              style={styles.nomEtPrenomInput}
              placeholder="Prénom"
              autoComplete="given-name"
              keyboardType="default"
              textAlign={'center'}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.twoContainer}>
            <TextInput
              onChangeText={(value) => setUsername(value)}
              value={username}
              style={styles.usernameInput}
              placeholder="Nom d'utilisateur"
              autoComplete="username"
              keyboardType="default"
              textAlign={'center'}
              autoCapitalize="none"
            />

            {show && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={changeDate}
                style={styles.dateTimePicker}
              />
            )}

            {!show && (
              <Pressable
                onPress={toggleShow}>
                <TextInput
                  onChangeText={setDate}
                  value={date.toDateString()}
                  style={styles.ageInput}
                  placeholder="Date de naissance"
                  textAlign={'center'}
                  editable={false}
                />
              </Pressable>
            )}

          </View>
          <TextInput
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.textInput}
            placeholder="Mot de passe"
            autoComplete="new-password"
            textAlign={'center'}
            keyboardType="default"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={(value) => setVerifPassword(value)}
            value={verifPassword}
            style={styles.textInput}
            placeholder="Confirmer le mot de passe"
            autoComplete="new-password"
            textAlign={'center'}
            keyboardType="default"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {wrongPassword && <Text>Les mots de passe ne correspondent pas.</Text>}
          {error && <Text>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={() => {
            setWrongPassword(false);
            setError('')
            if (password === verifPassword) {
              register({ email, nom, prenom, username, password, age: date })

            } else {
              setWrongPassword(true)
            }
          }
          }>
            <Text style={styles.textButton}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate('Authentification')} >
            <Text style={styles.retourButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoConnection: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  h1: {
    color: "#8B85EF",
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'BalooBhaina2-Regular'
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
    borderRadius: 50
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
    backgroundColor: "white",
  },
  twoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nomEtPrenomInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 150,
    height: 40,
    margin: 10,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 15,
    alignItems: "center",
    backgroundColor: "white",
  },
  usernameInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 180,
    height: 40,
    margin: 10,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 15,
    alignItems: "center",
    backgroundColor: "white"
  },
  ageInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 120,
    height: 40,
    margin: 10,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 15,
    alignItems: "center",
    backgroundColor: "white",

  },
  retourButton: {
    margin: 15
  },
  retourButtonText: {
    fontFamily: 'BalooBhaina2-Regular',
    color: "#8B85EF"
  },
  ageInputText: {
    fontFamily: 'BalooBhaina2-Regular',
    color: "gray",
    textAlign: 'center'
  },
  dateTimePicker: {
    height: 40,
    marginTop: -10
  }
});