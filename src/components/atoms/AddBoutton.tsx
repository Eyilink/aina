import React from 'react';
import {StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';     

export default function AddBoutton() {
  const handlePress = () => {
    // Fonction vide qui s'active lorsque vous cliquez sur le bouton
    // Vous pouvez ajouter votre logique ou vos actions ici
  };
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <AntDesign name="plus" size={50} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: '#fc327b',
  },
});