import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const categories = [
  { name: "Électronique", subcategories: [{ name: "Téléphones" }, { name: "Ordinateurs" }, { name: "Tablettes" }, { name: "Accessoires" }] },
  { name: "Vêtements", subcategories: [{ name: "Hommes" }, { name: "Femmes" }, { name: "Enfants" }, { name: "Accessoires" }] },
  { name: "Meubles", subcategories: [{ name: "Canapés" }, { name: "Tables" }, { name: "Chaises" }, { name: "Lits" }] },
  { name: "Livres", subcategories: [{ name: "Romans" }, { name: "Manuels scolaires" }, { name: "Bandes dessinées" }, { name: "Livres pour enfants" }] },
  { name: "Jouets", subcategories: [{ name: "Jeux de société" }, { name: "Puzzles" }, { name: "Jouets éducatifs" }, { name: "Peluches" }] }
];

const BACKEND_ADDRESS= 'http://192.168.1.182:3000/';                                           //Adresse à modifier

const Categories = ({ categorie, setCategorie, sousCategorie, setSousCategorie}) => {

    


  return (
    <View style={styles.container}>
        <View style={styles.pickerContainer}>
            <Text style={styles.h4}>Catégories</Text>
            <Picker
                selectedValue={categorie}
                onValueChange={(itemValue) => setCategorie(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Sélectionner une catégorie" value="" />
                {categories.map((category) => (
                <Picker.Item key={category.name} label={category.name} value={category.name} />
                ))}
            </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.h4}>Sous-catégories</Text>
        <Picker
            selectedValue={sousCategorie}
            onValueChange={(itemValue) => setSousCategorie(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Sélectionner une sous-catégorie" value="" />
            {categories.find(cat => cat.name === categorie)?.subcategories.map((subcategory) => (
            <Picker.Item key={subcategory.name} label={subcategory.name} value={subcategory.name} />
            ))}                                                                                          
        </Picker>          
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'relative',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  paragraphMain: { 
    paddingTop: 20,
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 13,
    lineHeight: 14,
  },
});

export default Categories;
