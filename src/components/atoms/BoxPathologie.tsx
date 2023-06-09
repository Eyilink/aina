import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import DropDownMenu from '@components/molecules/DropDownMenu'



import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';
import { Pathologie, Symptome } from '@store/types';

type Props = {
  objet: Symptome|Pathologie;
  objets?: Symptome[]|Pathologie[];
  ischeckeable : boolean;
};



const BoxPathologie = ({ objet, objets, ischeckeable}: Props): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const onPress = (): void => {
    setOpen(!open);
    setChecked(!checked);
  };

  return(
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            alignSelf: 'stretch',
            marginVertical: layout.padding/2,
          },
        ]}
        onPress={onPress}
      >
        <View  style={{flexDirection:'row'}}>
          {ischeckeable?(<>
          {checked ? (
            <>
            <AntDesign name="check" size={22} color={'#fc327b'} />
            <AppText 
              text={objet.name}
              style={styles.textClick}
            />
            </>
            ) : (
            <AppText 
              text={objet.name}
              style={styles.text}
            />)}</>) : (<AppText 
              text={objet.name}
              style={styles.text}
            />)
            }
          
          
        </View>
        

        {objets && open ? (<DropDownMenu objets={objets} ischeckeable= {ischeckeable}/>) : null}
      </TouchableOpacity>
    </View>

  );
};

export default BoxPathologie;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: fonts.subtitle.fontSize,
    color: colors.black,
    marginBottom: layout.padding,
    lineHeight: fonts.subtitle.fontSize + 3,
    marginHorizontal: layout.padding
  }, 
  button: {
    borderRadius: layout.buttons.borderRadius,
    marginHorizontal: layout.padding,
  },
  textClick: {
    marginLeft: 3,
    textAlign: 'center',
  },
  text: {
    marginLeft: 25,
    lineHeight: fonts.subtitle.fontSize + 3,
    textAlign: 'center',
  },
});
