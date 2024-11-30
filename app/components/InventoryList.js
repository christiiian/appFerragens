import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import InventoryItem from './InventoryItem';

const InventoryList = ({ inventory, setInventory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const removeItem = (key) => {
    setInventory(inventory.filter(item => item.key !== key));
  };

  const subtractItem = (key, removeQuantity) => {
    const updatedInventory = inventory.map(item => {
      if (item.key === key) {
        const newQuantity = parseInt(item.quantity) - removeQuantity;
        if (newQuantity >= 0) {
          return { ...item, quantity: newQuantity.toString() };
        } else {
          Alert.alert('Erro', 'Quantidade insuficiente para remover.');
          return item;
        }
      }
      return item;
    }).filter(item => parseInt(item.quantity) > 0);
    setInventory(updatedInventory);
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(filteredInventory.map(item => item.category))];

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map(category => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryHeader}>{category}</Text>
            <FlatList
              data={filteredInventory.filter(item => item.category === category)}
              renderItem={({ item }) => (
                <InventoryItem item={item} removeItem={removeItem} subtractItem={subtractItem} />
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default InventoryList;
