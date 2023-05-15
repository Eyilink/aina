import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AiOutlinePlus } from 'react-icons/ai';    

export default function AddBoutton() {
  return (
    <TouchableOpacity style={styles.button}>
      <AiOutlinePlus size={50} color='white'></AiOutlinePlus>
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