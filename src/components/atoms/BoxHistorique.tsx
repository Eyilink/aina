import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import colors from '@styles/colors';
import { Pathologie } from '@store/types';
import { getIconPath } from '@constants/constants';

type Props = {
  objet: Pathologie;// Props type declaration, expecting an object of type Pathologie
  onPress?: () => void;
  isWhite?: boolean;
};


 // This component represents a box displaying pathology information.
  // It takes an object of type Pathologie as a prop, along with an optional onPress function.


const BoxPathologie = ({ objet, onPress, isWhite }: Props): ReactElement => {
  return (
    <View style={isWhite ? { backgroundColor: colors.white } : null}>
      <TouchableOpacity onPress={onPress} style={[
        styles.container,
        isWhite ? { backgroundColor: colors.white } : { backgroundColor: colors.greyLight }
      ]}>
        {objet.namelogo ? <Image style={{ width: 40, height: 40 }} source={getIconPath(objet.namelogo)} /> : <Image style={{ width: 40, height: 40 }} source={getIconPath("")} />}
        <View style = {styles.content}>
          <AppText text={objet.name} style={styles.title} />
          {objet.more ? <AppText text={objet.more} style={styles.subtitle} /> : null}
          {objet.date ?
            objet.dateend ? 
              <AppText text= {"Du " + objet.date + " au " + objet.dateend } style={styles.text} /> 
              :
              <AppText text= {"Depuis le " + objet.date} style={styles.text} />
          :
            null}
          
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BoxPathologie;
    // styles 
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  container: {
    padding: 10,
    marginBottom: 10,
    flexDirection:'row',
    borderRadius: 20,
  },
  content:{
    marginLeft:20,
  }
});

  
