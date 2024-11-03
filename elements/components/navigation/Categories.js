import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { CategoryIcon } from '../../assets/Icons';

const categories = [
  { name: "Électronique", subcategories: [{ name: "Téléphones" }, { name: "Ordinateurs" }, { name: "Tablettes" }, { name: "Accessoires" }] },
  { name: "Vêtements", subcategories: [{ name: "Hommes" }, { name: "Femmes" }, { name: "Enfants" }, { name: "Accessoires" }] },
  { name: "Meubles", subcategories: [{ name: "Canapés" }, { name: "Tables" }, { name: "Chaises" }, { name: "Lits" }] },
  { name: "Livres", subcategories: [{ name: "Romans" }, { name: "Manuels scolaires" }, { name: "Bandes dessinées" }, { name: "Livres pour enfants" }] },
  { name: "Jouets", subcategories: [{ name: "Jeux de société" }, { name: "Puzzles" }, { name: "Jouets éducatifs" }, { name: "Peluches" }] }
];

const Categories = ({ categorie, setCategorie, sousCategorie, setSousCategorie }) => {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);

  const toggleCategoryModal = () => setCategoryModalVisible(!categoryModalVisible);
  const toggleSubcategoryModal = () => {
    if (categorie) { // Only open subcategory modal if a category is selected
      setSubcategoryModalVisible(!subcategoryModalVisible);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setCategorie(categoryName);
    setSousCategorie([]); // Reset subcategories on new category selection
    toggleCategoryModal();
  };

  const handleSubcategorySelect = (subcategoryName) => {
    if (sousCategorie.includes(subcategoryName)) {
      setSousCategorie(sousCategorie.filter(item => item !== subcategoryName));
    } else {
      setSousCategorie([...sousCategorie, subcategoryName]);
    }
  };
// Amir did not finish this styling part here!!!!!
  return (
    <View>

      {/* Category Selector */}
      <Text style={GlobalStyles.subtitleTextGrey}>Catégorie</Text>
      <TouchableOpacity style={GlobalStyles.DropDownFormContainer} onPress={toggleCategoryModal}>
        <Text style={GlobalStyles.miniTitleTextBlack}>
          {categorie || 'Sélectionner une catégorie'}
        </Text>
        <CategoryIcon width={24} height={24} color={Colors.lightGreyColor} />
      </TouchableOpacity>
      
      {/* Category Modal */}
      <Modal transparent visible={categoryModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleCategorySelect(item.name)}
                >
                  <Text style={GlobalStyles.subtitleTextBlack}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={toggleCategoryModal} style={styles.closeButton}>
              <Text style={GlobalStyles.subtitleTextRed}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Subcategory Selector */}
      <Text style={GlobalStyles.subtitleTextGrey}>Sous-catégories</Text>
      <TouchableOpacity
        style={GlobalStyles.DropDownFormContainer} // Disable style if no category selected
        onPress={toggleSubcategoryModal}
        disabled={!categorie} // Disable button if no category selected
      >
        <Text style={[GlobalStyles.miniTitleTextBlack, !categorie && GlobalStyles.miniTitleTextLightGrey]}>
          {sousCategorie.length > 0 ? sousCategorie.join(', ') : 'Choisir les sous-catégories'}
        </Text>
        <CategoryIcon width={24} height={24} color={Colors.lightGreyColor} />
      </TouchableOpacity>
      
      {/* Subcategory Modal */}
      {categorie && (
        <Modal transparent visible={subcategoryModalVisible} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories.find(cat => cat.name === categorie)?.subcategories || []}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSubcategorySelect(item.name)}
                  >
                    <Text style={GlobalStyles.subtitleTextRed}>
                      {sousCategorie.includes(item.name) ? '• ' : ''}{item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={toggleSubcategoryModal} style={styles.closeButton}>
                <Text style={GlobalStyles.subtitleTextRed}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    padding: 16,
    borderRadius: 8,
    borderColor: Colors.lightGreyColor,
    borderWidth: 1,
    marginBottom: 16,
  },

  dropdownText: {
    fontSize: 16,
    color: Colors.darkGreyColor,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    paddingVertical: 16,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGreyColor,
  },

  closeButton: {
    padding: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.redColor,
    fontWeight: 'bold',
  },
});

export default Categories;
