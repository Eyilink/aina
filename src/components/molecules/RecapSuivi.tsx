import React, { useState } from 'react';
import { SafeAreaView, View, Alert, Modal, StyleSheet } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import BoxHistorique from '@components/atoms/BoxHistorique';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';
import ListSymptome from '@components/atoms/ListSymptome';
import { Pathologie } from '@store/types';
import EndSuiviPopUp from '@components/popUp/EndSuiviPopUp';
import ScrollDownMenu from './ScrollDownMenu';
import { Chk_Box } from './ScrollDownMenu';


type Props = {
  objet: Pathologie;
};

const RecapSuivi = ({ objet }: Props) => {
  const [ButtonEdit, setButtonEdit] = useState(false);

  const onPress = () => {
    console.log("Press");
    setButtonEdit(!ButtonEdit);
  };

  const [showPopUp, setShowPopUp] = useState(false);

  const onValidate = () => {
    setShowPopUp(true);
  };

  const onClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <View>
      <BoxHistorique objet={objet}/>
      {ButtonEdit?
                  <>
                  {objet.map((item, index) => {
                    if (isWhichP === item.id) {
                      return (
                        <React.Fragment key={index}>
                          {item.symptoms.map((symptom, idx) => (
                            <Chk_Box key={idx} index={idx} symptom={symptom} id_p={item.id} twoDArray={twoDArray} setTDArray={setTDArray} pressingChkBx={()=>{}}/>
                          ))}
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ScrollView></>: <ListSymptome objets={objet.symptoms} onPress={onPress}/>}
      

      <Button text={i18n.t('suivi.end')} 
              isSelected
              onPress={onValidate} />
      <Modal visible={showPopUp} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <EndSuiviPopUp onClose={onClosePopUp} pathologieRemove={objet} />
        </View>
      </Modal>
            
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
});

export default RecapSuivi;