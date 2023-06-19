import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';
import { Pathologie } from '@store/types';
import { Ionicons } from '@expo/vector-icons';
import layout from '@styles/layout';
import colors from '@styles/colors';
// import Symptome from '@store/types';

type AskPopUpProps = {
  path: Pathologie;
  onClose: () => void;
};

const FreqPopUp = ({ path, onClose }: AskPopUpProps) => {

    const yesPressed = (): void => {
        console.log("doSmth");
      };
  return (
    <View style={styles.popUpContainer}>
      <Ionicons
        name="ios-arrow-round-back"
        size={layout.navigation.previousIcon.size}
        color={colors.black}
        onPress={onClose}
        style={{marginLeft:12}}
      />
        <View>
        <Text style={styles.text}>{i18n.t('suivi.questionfrequence')}</Text>
      </View>
      {/* <Button style={{backgroundColor:'#EE4483'}}
          text={i18n.t('commons.yes')}
          onPress={yesPressed}
        /> */}
        <Button
          text={i18n.t('commons.validate')}
          onPress={onClose}
        />      
    </View>
  );
};
export default FreqPopUp;

const styles = StyleSheet.create({
  popUpContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
  },
  text:{
    fontSize: 22,
    marginBottom:15,
    textAlign: 'center',
  },
});


