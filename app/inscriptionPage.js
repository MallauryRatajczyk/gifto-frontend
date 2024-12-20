import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Pressable, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { toConnectUser } from '../reducers/user';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const { dateRequired } = require('../modules/dateRequirement');

export default function Inscription({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [verifPassword, setVerifPassword] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState('');

  const toggleShow = () => {
    setDate(dateRequired());
    setShow(!show);
  };

  const register = (userObject) => {
    fetch(`${BACKEND_ADDRESS}/users/enregistrer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObject),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          dispatch(toConnectUser({ token: data.token, email, username }));
          navigation.navigate('TabNavigator');
        }
      });
  };

  const changeDate = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        setShow(false);
      }
    } else {
      setShow(false);
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logoGifto.png')} style={styles.logoConnection} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.textContain}>Inscription</Text>

          {/* Champ Email */}
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

          {/* Nom et Prénom */}
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

          {/* Nom d'utilisateur et Date de naissance */}
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
              <Pressable onPress={toggleShow}>
                <TextInput
                  value={date.toDateString()}
                  style={styles.ageInput}
                  placeholder="Date de naissance"
                  textAlign={'center'}
                  editable={false}
                />
              </Pressable>
            )}
          </View>

          {/* Mot de passe et confirmation */}
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
          {wrongPassword && <Text style={styles.errorText}>Les mots de passe ne correspondent pas.</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Bouton d'inscription */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setWrongPassword(false);
              setError('');
              if (password === verifPassword) {
                register({ email, nom, prenom, username, password, age: date });
              } else {
                setWrongPassword(true);
              }
            }}
          >
            <Text style={styles.textButton}>S'inscrire</Text>
          </TouchableOpacity>

          {/* Bouton retour */}
          <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate('Authentification')}>
            <Text style={styles.retourButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9', // Fond léger
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoConnection: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textContain: {
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 28,
    color: "#8B85EF",
    fontWeight: 'bold',
    marginBottom: 30,
  },
  formContainer: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 320,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 16,
    backgroundColor: 'white',
    borderColor: '#8B85EF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  twoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  nomEtPrenomInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 150,
    height: 50,
    margin: 10,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 15,
    backgroundColor: "white",
    borderColor: '#8B85EF',
  },
  usernameInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 180,
    height: 50,
    margin: 10,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 15,
    backgroundColor: "white",
    borderColor: '#8B85EF',
  },
  ageInput: {
    borderWidth: 1,
    borderRadius: 50,
    width: 150,
    height: 50,
    margin: 10,
    fontFamily: 'BalooBhaina2-Regular',
    fontSize: 15,
    backgroundColor: "white",
    borderColor: '#8B85EF',
  },
  button: {
    backgroundColor: "#8B85EF",
    padding: 15,
    width: 320,
    borderRadius: 50,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textButton: {
    fontFamily: 'BalooBhaina2-Regular',
    color: 'white',
    fontSize: 18,
  },
  retourButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  retourButtonText: {
    fontFamily: 'BalooBhaina2-Regular',
    color: "#8B85EF",
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  dateTimePicker: {
    height: 40,
    marginTop: -10,
  },
});
