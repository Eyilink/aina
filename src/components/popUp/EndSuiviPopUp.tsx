import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';
import { Pathologie } from '@store/types';
import { useUserStore } from '@store/store';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';

type AskPopUpProps = {
  onClose: () => void;
  pathologieRemove: Pathologie;
};

const EndSuiviPopUp = ({ onClose, pathologieRemove }: AskPopUpProps) => {
  const [user, actions] = useUserStore({ disease: MALADIE1 });

  const yesPressed = (): void => {
    actions.editUserProfile({key: 'my_personal_datas' , value: user.my_personal_datas.filter((item: Pathologie) => item.id !== pathologieRemove.id)});
    pathologieRemove.dateend=DATE_TODAY;
    if (user.my_previous_personal_datas){
      const pathologie: Pathologie[]=[...user.my_previous_personal_datas, pathologieRemove];;
      actions.editUserProfile({key: 'my_previous_personal_datas' , value: pathologie});
    }
    else {
      const pathologie: Pathologie[]=[pathologieRemove];
      actions.editUserProfile({key: 'my_previous_personal_datas' , value: pathologie});
    }
    // console.log(user.my_previous_personal_datas+=(pathologieRemove));
    onClose();
  };
  return (
    <View style={styles.popUpContainer}>
        <View>
        <Text style={styles.text}>{i18n.t('report.endrecord')}</Text>
      </View>
      <View style={styles.rowButton}>
      <Button style={styles.button}
          text={i18n.t('commons.yes')}
          isValidate
          isSelected
          onPress={yesPressed}
        />
        <Button style={styles.button}
          text={i18n.t('commons.no')}
          onPress={onClose}
        /> 
        </View>
             
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
  rowButton:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    margin: 10
  }
});

export default EndSuiviPopUp;
