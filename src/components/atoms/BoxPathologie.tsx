import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import DropDownMenu from '@components/molecules/DropDownMenu'



import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';

type Symptome = {
  nom: string
}

type Pathologie = {
  nom: string
}

type Props = {
  objet: Symptome|Pathologie;
  objets?: Symptome[]|Pathologie[];
  //onPress: () => void;
};



const BoxPathologie = ({ objet, objets }: Props): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const onPress = (): void => {
    //console.log(open);
    setOpen(!open);
    setChecked(!checked);
  };

  return(
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            //backgroundColor: isSelected ? colors.primary : colors.greyLight,
            alignSelf: 'stretch',
            marginVertical: layout.padding/2,
          },
        ]}
        onPress={onPress}
      >
        <View  style={{flexDirection:'row'}}>
          {checked ? (
            <>
            <AntDesign name="check" size={22} color={'#fc327b'} />
            <AppText 
              text={objet.nom}
              style={styles.textClick}
            />
            </>
            ) : (
            <AppText 
              text={objet.nom}
              style={styles.text}
            />)}
          
          
        </View>
        

        {objets && open ? (<DropDownMenu objets={objets}/>) : null}
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
