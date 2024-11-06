import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import { SearchIcon } from '../../assets/Icons';
import Typography from '../../styles/Typography';

const BACKEND_ADDRESS = "http://192.168.86.114:3000"

export default function SearchBar({
  placeholder = "Chercher",
  iconColor = Colors.purpleColor,
  textColor = Colors.textColor,
  onSearch,
}) {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced search handler
  const debounceSearch = useCallback(() => {
    if (inputText.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);

    // Perform search
    fetch(`${BACKEND_ADDRESS}/search?query=${inputText}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.items); // Assumes `objets` is the array of search results
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [inputText]);

  // Use debounce effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      debounceSearch();
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce); // Clean up the timer on component unmount
  }, [inputText, debounceSearch]);

  return (
    <View style={{ padding: 10 }}>
      <View style={[GlobalStyles.whiteSearchContainer, { flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
        <SearchIcon width={24} height={24} color={iconColor} style={{ marginRight: 10 }} />
        
        <TextInput
          style={{ flex: 1, color: textColor, fontSize: 16 }}
          placeholder={placeholder}
          placeholderTextColor={Colors.shadow}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="small" color={Colors.shadow} style={{ marginTop: 10 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.shadow }}>
              <Text style={{ color: Colors.textColor }}>{item.name}</Text>
            </View>
          )}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
}
