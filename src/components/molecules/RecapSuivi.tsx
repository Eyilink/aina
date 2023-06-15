import React, { useState } from 'react';
import { SafeAreaView, View, Alert, Modal, StyleSheet, Text } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import BoxHistorique from '@components/atoms/BoxHistorique';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';
import ListSymptome from '@components/atoms/ListSymptome';
import { Pathologie } from '@store/types';
import EndSuiviPopUp from '@components/popUp/EndSuiviPopUp';
import { useUserStore } from '@store/store';
import { MALADIE1 } from '@constants/constants';

type Props = {
  objet: Pathologie;
};

const RecapSuivi = ({ objet }: Props) => {
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  const [showPopUp, setShowPopUp] = useState(false);

  const onValidate = () => {
    setShowPopUp(true);
    console.log(user.my_previous_personal_datas);
    console.log("Now",user.my_personal_datas);
  };

  const onClosePopUp = () => {
    setShowPopUp(false);
    console.log(user.my_previous_personal_datas);
  };

  return (
    <View>
      <BoxHistorique objet={objet}/>

      <ListSymptome objets={objet.symptoms}/>

      <Button text={i18n.t('suivi.end')} 
              isSelected
              onPress={onValidate} />
      <Modal visible={showPopUp} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <EndSuiviPopUp onClose={onClosePopUp} pathologieRemove={objet} />
        </View>
      </Modal>
      <View style={styles.separator} />      
    </View>
  );

  
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    margin: 23,
  },
});

export default RecapSuivi;