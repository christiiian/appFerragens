import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Alert, View, TouchableOpacity, Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import InventoryList from './components/InventoryList';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AddItem = ({ addItem, itemName, setItemName, itemQuantity, setItemQuantity, itemCategory, setItemCategory, categories }) => (
  <View style={styles.container}>
    <TextInput 
      style={styles.input}
      placeholder="Nome do Item"
      value={itemName}
      onChangeText={setItemName}
    />
    <TextInput 
      style={styles.input}
      placeholder="Quantidade"
      value={itemQuantity}
      onChangeText={setItemQuantity}
      keyboardType="numeric"
    />
    <Picker
      selectedValue={itemCategory}
      onValueChange={setItemCategory}
      style={styles.picker}
    >
      {categories.map((category, index) => (
        <Picker.Item label={category} value={category} key={index} />
      ))}
    </Picker>
    <TouchableOpacity style={styles.addButton} onPress={addItem}>
      <Ionicons name="add-circle" size={24} color="white" style={styles.addIcon} />
      <Text style={styles.addButtonText}>Adicionar Item</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [inventory, setInventory] = useState([]);
  const [index, setIndex] = useState(0);

  const categories = ['Metalon', 'Chapa', 'Barra chata', 'Tubo', 'Zinco'];

  const addItem = () => {
    if (itemName === '' || itemQuantity === '' || itemCategory === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    const itemIndex = inventory.findIndex(item => item.name === itemName && item.category === itemCategory);
    if (itemIndex > -1) {
      const updatedInventory = [...inventory];
      updatedInventory[itemIndex].quantity = parseInt(updatedInventory[itemIndex].quantity) + parseInt(itemQuantity);
      setInventory(updatedInventory);
    } else {
      setInventory([...inventory, { key: Math.random().toString(), name: itemName, quantity: itemQuantity, category: itemCategory }]);
    }
    setItemName('');
    setItemQuantity('');
    setItemCategory('');
  };

  const InventoryRoute = () => (
    <InventoryList inventory={inventory} setInventory={setInventory} />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'inventory':
        return <InventoryRoute />;
      case 'addItem':
        return (
          <AddItem 
            addItem={addItem} 
            itemName={itemName}
            setItemName={setItemName}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
            itemCategory={itemCategory}
            setItemCategory={setItemCategory}
            categories={categories}
          />
        );
      default:
        return null;
    }
  };

  const [routes] = useState([
    { key: 'inventory', title: 'Controle de Estoque', icon: ({ color }) => <MaterialIcons name="format-list-bulleted" size={24} color={color} /> },
    { key: 'addItem', title: 'Adicionar Item', icon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} /> },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor="black"
        inactiveColor="gray"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF2800',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  addIcon: {
    marginRight: 5,
  },
});

export default App;
