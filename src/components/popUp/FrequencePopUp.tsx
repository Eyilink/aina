import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';
import { Pathologie, Symptome } from '@store/types';
import { Ionicons } from '@expo/vector-icons';
import layout from '@styles/layout';
import colors from '@styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { pathologieJSON, symptomeJSON } from '@constants/constants';
import { useAuthStore, useUserStore } from '@store/store';
import { MALADIE1 } from '@constants/constants';
import AppText from '@components/atoms/AppText';
// import Symptome from '@store/types';


type AskPopUpProps = {
  pato: Pathologie;
  onClose: () => void;
};


const FreqPopUp = ({ pato, onClose }: AskPopUpProps) => {

  const [user, actions] = useUserStore({ disease: MALADIE1 });

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

      <View>
        <ScrollView>
         {
          user.my_personal_datas.forEach((pathology) => {
            if (pathology.id===pato.id) {
              pathology.symptoms.forEach((symptChecked) => {
                console.log(symptChecked.name);
                  return <Button text={symptChecked.name} onPress={onClose}/>
              })
            }
          })
        }
      </ScrollView>
    </View>  
      
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


