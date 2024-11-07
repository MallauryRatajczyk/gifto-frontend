import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { SearchIcon } from '../../assets/Icons';

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function SearchBar({
  placeholder = "Chercher",
  iconColor = Colors.purpleColor,
  textColor = Colors.textColor,
  onSearch,
  trocValue = true, //to control troc filter value
}) {
  const [chercher, setChercher] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(() => {
    if (chercher.trim() === '') {
      onSearch([]); 
      return;
    }
    
    setLoading(true);

    fetch(`${BACKEND_ADDRESS}/item`)
      .then(response => response.json())
      .then(data => {
        // Filtre les items où troc est la valeur spécifiée
        const filtreTrocTrue = data.item.filter(item => item.troc === trocValue);
        
        // Filtre par le terme de recherche
        const resultatsFiltres = filtreTrocTrue.filter(item =>
          item.name.toLowerCase().includes(chercher.toLowerCase())
        );

        setLoading(false);
        if (onSearch) {
          onSearch(resultatsFiltres);
        }
      });
  }, [chercher, onSearch, trocValue]);

  return (
    <View style={GlobalStyles.whiteSearchContainer}>

      <TextInput
        style={[
          GlobalStyles.SearchBarText, {paddingHorizontal: 10, height: 36, flex: 1 }]}
        placeholder={placeholder}
        placeholderTextColor={Colors.shadow}
        value={chercher}
        onChangeText={setChercher}
        onSubmitEditing={handleSearch}
      />
      <View>
      <TouchableOpacity 
        onPress={handleSearch} 
        style={{ 
          marginLeft: 10,
          width: 30,  
          height: 0, 
          justifyContent: 'center',
          alignItems: 'center'
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.7}
      >
        <SearchIcon width={36} height={36} color={iconColor} style={{ opacity: loading ? 0 : 1 }} />
      </TouchableOpacity>
      
      <ActivityIndicator
        size="large"
        color={Colors.shadow}
        style={{ 
          position: 'absolute',
          opacity: loading ? 1 : 0,
          }}
        />
      </View>

    </View>
  );
}