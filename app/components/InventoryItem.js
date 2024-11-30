import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InventoryItem = ({ item, removeItem, subtractItem }) => {
  const [removeQuantity, setRemoveQuantity] = useState('');

  const confirmRemoveItem = () => {
    Alert.alert(
      'Confirmar Remoção',
      'Tem certeza que deseja remover toda a categoria?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => removeItem(item.key),
        },
      ],
      { cancelable: true }
    );
  };

  const handleSubtract = () => {
    if (removeQuantity === '' || isNaN(removeQuantity) || removeQuantity <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida para remover.');
      return;
    }
    subtractItem(item.key, parseInt(removeQuantity));
    setRemoveQuantity('');
  };

  const isLowStock = item.quantity < 10;

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.itemText}>{item.name} - Quantidade: {item.quantity}</Text>
        <TouchableOpacity onPress={confirmRemoveItem} style={styles.removeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isLowStock && <Text style={styles.lowStock}>Estoque baixo! necessário repor.</Text>}
      <View style={styles.row}>
        <TextInput 
          style={styles.input}
          placeholder="Qtde"
          value={removeQuantity}
          onChangeText={(text) => setRemoveQuantity(text)}
          keyboardType="numeric"
        />
        <Button title="Retirar" onPress={handleSubtract} color="#FF2800" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    width: 80,
  },
  lowStock: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 8,
  },
});

export default InventoryItem;
