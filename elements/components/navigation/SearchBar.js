import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
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

  /*useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [chercher, handleSearch]);*/

  return (
    <View style={[GlobalStyles.whiteSearchContainer, { flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
      <SearchIcon width={24} height={24} color={iconColor} style={{ marginRight: 10 }} />
      
      <TextInput
        style={{ flex: 1, color: textColor, fontSize: 16 }}
        placeholder={placeholder}
        placeholderTextColor={Colors.shadow}
        value={chercher}
        onChangeText={setChercher}
      />
      
      {loading && (
        <ActivityIndicator size="small" color={Colors.shadow} style={{ marginLeft: 10 }} />
      )}
    </View>
  );
}