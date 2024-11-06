import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../elements/styles/GlobalStyles';
import Colors from '../elements/styles/Colors';
import ImageHolder from '../elements/components/navigation/ImageHolder';
import HeaderMenu from '../elements/components/navigation/HeaderMenu';

import SearchBar from '../elements/components/navigation/SearchBar';

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function RechercheRecevoir() {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.screenMainContainer}>

      <SearchBar iconColor={Colors.greenColor} />


      <View style={GlobalStyles.screenHomeContainer}>  
        <Text style={GlobalStyles.titleTextBlack}>Recommandation</Text>
      </View>

      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={GlobalStyles.RecommendationContainer}>
        <ImageHolder />
        <ImageHolder />
        <ImageHolder />
        <ImageHolder />
        <ImageHolder />
        <ImageHolder />

          
        </ScrollView>
          
        <View style={GlobalStyles.screenHomeContainer}>  
        <Text style={GlobalStyles.titleTextBlack}>Recommandation</Text>
      </View>


    </View>
  );
}


//        <ImageHolder onPress={() => console.log('Image holder clicked!')} />