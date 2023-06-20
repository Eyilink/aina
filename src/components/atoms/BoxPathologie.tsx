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
  objet: Symptome|Pathologie; // Props type declaration, expects an object of type Symptome or Pathologie
  objets?: Symptome[]|Pathologie[];
  ischeckeable : boolean;
  onCheckboxChange: () => void;
};



const BoxPathologie = ({ objet, objets, ischeckeable}: Props): ReactElement => {
  const [open, setOpen] = React.useState(false);// State variable to track whether the box is open or closed
  const [checked, setChecked] = React.useState(false); // State variable to track whether the checkbox is checked or not
  const onPress = (): void => {
    setOpen(!open); // Toggle the open state when the box is pressed
    setChecked(!checked); // Toggle the checked state when the box is pressed
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
        

        {objets && open ? (// If objets is provided and the box is open
        <DropDownMenu objets={objets} ischeckeable= {ischeckeable}/>) : null}
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
