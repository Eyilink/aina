import React, { ReactElement } from 'react';
import {StyleSheet, TouchableOpacity,View,ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';     



type Props = {
  onPress: () => void;
  style?: ViewStyle;
};
const AddBoutton = ({
  onPress,
  style,
}: Props): ReactElement => (
  <View style={style}>
  <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
      <AntDesign name="plus" size={50} color="white" />
    </TouchableOpacity>
  </View>
);


export default AddBoutton;

// export default function AddBoutton() {
//   const handlePress = () => {
//     // Fonction vide qui s'active lorsque vous cliquez sur le bouton
//     // Vous pouvez ajouter votre logique ou vos actions ici
//   };
//   return (
//     <TouchableOpacity style={styles.button} onPress={handlePress}>
//       <AntDesign name="plus" size={50} color="white" />
//     </TouchableOpacity>
//   );
// }

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