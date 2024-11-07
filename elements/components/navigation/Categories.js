import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const categories = [
  { name: "Électronique", subcategories: [{ name: "Téléphones" }, { name: "Ordinateurs" }, { name: "Tablettes" }, { name: "Accessoires" }] },
  { name: "Vêtements", subcategories: [{ name: "Hommes" }, { name: "Femmes" }, { name: "Enfants" }, { name: "Accessoires" }] },
  { name: "Meubles", subcategories: [{ name: "Canapés" }, { name: "Tables" }, { name: "Chaises" }, { name: "Lits" }] },
  { name: "Livres", subcategories: [{ name: "Romans" }, { name: "Manuels scolaires" }, { name: "Bandes dessinées" }, { name: "Livres pour enfants" }] },
  { name: "Jouets", subcategories: [{ name: "Jeux de société" }, { name: "Puzzles" }, { name: "Jouets éducatifs" }, { name: "Peluches" }] }
];

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
    <View>
      <View style={GlobalStyles.pickerContainer}>
        <Text style={GlobalStyles.subtitleTextGrey}>Catégories</Text>

        <DropDownPicker 
          style={GlobalStyles.pickerMenu}
          open={openCategorie}
          value={categorie}
          items={categoriesItems}
          setOpen={handleOpenCategorie}
          setValue={setCategorie}
          placeholder="Sélectionner une catégorie"
          placeholderStyle={[GlobalStyles.subtitleTextGrey, {marginBottom: -16, marginLeft: 8}]}
          textStyle={[GlobalStyles.subtitleTextBlack, {marginBottom: -16, marginLeft: 8}]}
          dropDownContainerStyle={[GlobalStyles.dropDownContainer, {marginBottom: 70}]}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true
          }}
          maxHeight={200}
        />
      </View>

      <View style={GlobalStyles.pickerContainer}>
        <Text style={GlobalStyles.subtitleTextGrey}>Sous-catégories</Text>

        <DropDownPicker
          style={GlobalStyles.pickerMenu}
          open={openSousCategorie}
          value={sousCategorie}
          items={sousCategories}
          setOpen={handleOpenSousCategorie}
          setValue={setSousCategorie}
          placeholder="Sélectionner une sous-catégorie"
          placeholderStyle={[GlobalStyles.subtitleTextGrey, {marginBottom: -16, marginLeft: 12}]}
          textStyle={[GlobalStyles.subtitleTextBlack, {marginBottom: -16, marginLeft: 8}]}
          dropDownContainerStyle={[GlobalStyles.dropDownContainer, {marginBottom: 70}]}
          disabled={!categorie}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true
          }}
          maxHeight={200}
          placeholderTextColor={Colors.lightGreyColor}
        />
      </View>
    </View>
  );
};

export default Categories;