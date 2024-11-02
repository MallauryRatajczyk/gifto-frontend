import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { toConnectUser } from '../reducers/user';

import { GiftoSymbol } from '../elements/assets/Icons';
import Colors from '../elements/styles/Colors';
import GlobalStyles from '../elements/styles/GlobalStyles';

import MainButton from '../elements/components/buttons/MainButton';
import SecondaryButton from '../elements/components/buttons/SecondaryButton';
import InputCard from '../elements/components/cards/InputCard';
import PasswordInputCard from '../elements/components/cards/PasswordInputCard';
import DateInputCard from '../elements/components/cards/DateInputCard';

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function Inscription({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [verifPassword, setVerifPassword] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState('');

  const register = (userObject) => {
    fetch('http://192.168.1.81:3000/users/enregistrer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          dispatch(toConnectUser({ token: data.token, email, username }));
          navigation.navigate('TabNavigator');
        }
      });
  };

  return (
    <SafeAreaProvider style={GlobalStyles.appStyle}>
      <SafeAreaView>

        <ScrollView
          Style={GlobalStyles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Add a wrapper for shadow spacing */}
          <View style={GlobalStyles.screenHomeContainer}>

            {/* Header section */}
            <View style={GlobalStyles.IntroLogoContainer}>
              <GiftoSymbol width={100} height={100} />
              <Text style={GlobalStyles.headerTextPurple} marginTop={-24}>
                Inscription
              </Text>
            </View>

            {/* Registration Form Section */}
            <View>
              {/* Email Input Field */}
              <InputCard
                title="Adresse Email"
                onChangeText={(value) => setEmail(value)}
                value={email}
                placeholder="johndoe@gmail.com"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />

              {/* Last Name Input */}
              <InputCard
                title="Nom"
                onChangeText={(value) => setNom(value)}
                value={nom}
                placeholder="NOM"
                autoComplete="name-family"
                autoCapitalize="characters"
              />

              {/* First Name Input */}
              <InputCard
                title="Prénom"
                onChangeText={(value) => setPrenom(value)}
                value={prenom}
                placeholder="Prénom"
                autoComplete="name-given"
                autoCapitalize="words"
              />

              {/* Username Input */}
              <InputCard
                title="Nom d'utilisateur"
                onChangeText={(value) => setUsername(value)}
                value={username}
                placeholder="Nom d'utilisateur"
                autoComplete="username"
                autoCapitalize="none"
              />

              {/* Date of Birth Input */}
              <DateInputCard
                title="Date de naissance"
                value={date}
                onChange={(selectedDate) => setDate(selectedDate)}
                placeholder="Date de naissance"
              />

              {/* Password Input Fields */}
              <PasswordInputCard
                title="Mot de passe"
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Mot de passe"
              />

              <PasswordInputCard
                title="Confirmer le mot de passe"
                onChangeText={(value) => setVerifPassword(value)}
                value={verifPassword}
                placeholder="Confirmer le mot de passe"
              />

              {/* Display error messages if any */}
              {wrongPassword && (
                <Text style={GlobalStyles.errorText}>
                  Les mots de passe ne correspondent pas.
                </Text>
              )}
              {error && <Text style={GlobalStyles.errorText}>{error}</Text>}
            </View>

            {/* Registration Button */}
            <MainButton
              title="S'inscrire"
              onPress={() => {
                setWrongPassword(false);
                setError('');
                if (password === verifPassword) {
                  register({
                    email,
                    nom,
                    prenom,
                    username,
                    password,
                    age: date,
                  });
                } else {
                  setWrongPassword(true);
                }
              }}
              normalBackgroundColor={Colors.purpleColor}
              clickedBackgroundColor={Colors.redColor}
            />

            {/* Back Button */}
            <SecondaryButton
              title="Retour"
              onPress={() => navigation.navigate('Authentification')}
              normalBackgroundColor={Colors.backgroundColor}
              clickedBackgroundColor={Colors.redColor}
              normalStrokeColor={Colors.redColor}
              clickedStrokeColor={Colors.redColor}
              normalTextColorStyle={GlobalStyles.buttonTextRed}
              clickedTextColorStyle={GlobalStyles.buttonTextWhite}
            />

              {/* Spacing */}
              <View style={{ marginVertical: 140 }} />

          </View>



                    
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


