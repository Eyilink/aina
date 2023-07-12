import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DATE_TODAY, MALADIE1, getIconPath } from '@constants/constants';
import { useUserStore } from '@store/store';
import AppText from '@components/atoms/AppText';
import { ImageContext } from './ImageContext';

interface Props {
}

const ToolBar = () => {
    const [user, actions] = useUserStore({ disease: MALADIE1 });
    const dateString = DATE_TODAY;
    const [date, time] = dateString.split(' ');
    const [day, month] = date.split('/');
    const { imageProp, setImageProp } = useContext(ImageContext);
  const parsedDate = `${day}/${month}`;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable_1} activeOpacity={0.7}>
        {imageProp && <Image source={getIconPath(imageProp)} style={styles.image} />}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <AppText style={styles.text} text={user.username} />
        <AppText style={styles.text} text={parsedDate} />
      </View>
      <TouchableOpacity style={styles.touchable} activeOpacity={0.7}>
        <AntDesign name="info" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    
  },
  touchable_1: {
    width: 70,
    height: 70,
    borderRadius: 50,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  touchable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ToolBar;
