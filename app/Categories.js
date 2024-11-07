import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const categories = [
  { name: "Électronique", subcategories: [{ name: "Téléphones" }, { name: "Ordinateurs" }, { name: "Tablettes" }, { name: "Accessoires" }] },
  { name: "Vêtements", subcategories: [{ name: "Hommes" }, { name: "Femmes" }, { name: "Enfants" }, { name: "Accessoires" }] },
  { name: "Meubles", subcategories: [{ name: "Canapés" }, { name: "Tables" }, { name: "Chaises" }, { name: "Lits" }] },
  { name: "Livres", subcategories: [{ name: "Romans" }, { name: "Manuels scolaires" }, { name: "Bandes dessinées" }, { name: "Livres pour enfants" }] },
  { name: "Jouets", subcategories: [{ name: "Jeux de société" }, { name: "Puzzles" }, { name: "Jouets éducatifs" }, { name: "Peluches" }] }
];

const BACKEND_ADDRESS = "http://192.168.1.81:3000"                                         //Adresse à modifier

const Categories = ({ categorie, setCategorie, sousCategorie, setSousCategorie }) => {

  /* return (
     <View style={styles.pickerContainer}>
       <Text>Catégories</Text>
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
 
       <Text>Sous-catégories</Text>
       <Picker
         selectedValue={sousCategorie}
         onValueChange={(itemValue) => setSousCategorie(itemValue)}
         style={styles.picker}
       >
         <Picker.Item label="Sélectionner une sous-catégorie" value="" />
         {categories.find(cat => cat.name === categorie)?.subcategories.map((subcategory) => (
           <Picker.Item key={subcategory.name} label={subcategory.name} value={subcategory.name} />
         ))}
       </Picker>*/

  const Categories = ({ categorie, setCategorie, sousCategorie, setSousCategorie }) => {
    const [openCategorie, setOpenCategorie] = useState(false);
    const [openSousCategorie, setOpenSousCategorie] = useState(false);

    const categoriesItems = categories.map(cat => ({
      label: cat.name,
      value: cat.name
    }));

    const sousCategories = categories
      .find(cat => cat.name === categorie)
      ?.subcategories.map(subcat => ({
        label: subcat.name,
        value: subcat.name
      })) || [];
    //  fonction pour fermer la sousCategorie, si la categorie est ouverte
    const handleOpenCategorie = (open) => {
      if (open) {
        setOpenSousCategorie(false);
      }
      setOpenCategorie(open);
    };

    const handleOpenSousCategorie = (open) => {
      if (open) {
        setOpenCategorie(false);
      }
      setOpenSousCategorie(open);
    };


    return (
      <View style={styles.container}>
        <View style={[styles.pickerContainer, { zIndex: 2000 }]}>
          <Text style={styles.h4}>Catégories</Text>
          <DropDownPicker
            open={openCategorie}
            value={categorie}
            items={categoriesItems}
            setOpen={handleOpenCategorie}
            setValue={setCategorie}
            placeholder="Sélectionner une catégorie"
            style={styles.picker}
            dropDownContainerStyle={styles.dropDownContainer}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true
            }}
            maxHeight={200}  // Hauteur maximale de la liste déroulante
          />
        </View>
        <View style={[styles.pickerContainer, { zIndex: 1000 }]}>
          <Text style={styles.h4}>Sous-catégories</Text>
          <DropDownPicker
            open={openSousCategorie}
            value={sousCategorie}
            items={sousCategories}
            setOpen={handleOpenSousCategorie}
            setValue={setSousCategorie}
            placeholder="Sélectionner une sous-catégorie"
            style={styles.picker}
            dropDownContainerStyle={styles.dropDownContainer}
            disabled={!categorie}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true
            }}
            maxHeight={200}  // Hauteur maximale de la liste déroulante
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    pickerContainer: {
      marginBottom: 50,  // espace pour la liste déroulante
    },
    picker: {
      borderRadius: 15,
      borderWidth: 1,
      height: 40,
    },
    dropDownContainer: {
      borderWidth: 1,
    },
    h4: {
      marginBottom: 5,
      fontFamily: 'BalooBhaijaan2_400Regular',
      fontSize: 13,
    }
  });

  export default Categories;
