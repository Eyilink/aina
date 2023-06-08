import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';

type AskPopUpProps = {
  onClose: () => void;
};

const EndSuiviPopUp = ({ onClose }: AskPopUpProps) => {

    const yesPressed = (): void => {
        console.log("Terminer le suivi");
      };
  return (
    <View style={styles.popUpContainer}>
        <View>
        <Text style={styles.text}>{i18n.t('report.endrecord')}</Text>
      </View>
      <Button style={{backgroundColor:'#EE4483'}}
          text={i18n.t('commons.yes')}
          onPress={yesPressed}
        />
        <Button
          text={i18n.t('commons.no')}
          onPress={onClose}
        />   
        
    </View>
  );
};

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

export default EndSuiviPopUp;
