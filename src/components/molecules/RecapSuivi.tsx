import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import BoxHistorique from '@components/atoms/BoxHistorique';
import Button from '@components/atoms/Button';
import { Entypo } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import ListSymptome from '@components/atoms/ListSymptome';
import { Pathologie, Symptome } from '@store/types';
import AppText from '@components/atoms/AppText';
import EndSuiviPopUp from '@components/popUp/EndSuiviPopUp';
import ScrollDownMenu from './ScrollDownMenu';
import { Chk_Box } from './ScrollDownMenu';
import { useAuthStore, useUserStore } from '@store/store';
import { MALADIE1, pathologieJSON, symptomeJSON } from '@constants/constants';


type Props = {
  objet: Pathologie;
};
type scrollProps = {
  index: number,
  item: Symptome,
  id_p: string
}
const ScrollItem = ({index,item,id_p} : scrollProps) => {
  const [isChecked,setIsChecked] = useState<boolean>(false);
  const [user, ] = useUserStore({ disease: MALADIE1 });
  const [,actions] = useAuthStore();
  useEffect(()=>{
    const isSympchecked = user.my_personal_datas.find((obj)=> obj.id === id_p)?.symptoms.find((o)=> o.id === item.id)
    if(isSympchecked)
      setIsChecked(true);
  },[]);
  useEffect(()=>{
    if(isChecked)
    {
      const updatedPathos = user.my_personal_datas.map((obj) => {
        if (obj.id === id_p) {
          const updatedSymptoms = [...obj.symptoms];
          const hasDuplicate = updatedSymptoms.some((symptom) => symptom.id === item.id);
      
          if (!hasDuplicate) {
            updatedSymptoms.push(item);
          }
      
          return {
            ...obj,
            symptoms: updatedSymptoms,
          };
        }
        return obj;
      });
      
      console.log(updatedPathos);
      actions.editUserProfile({ key: 'my_personal_datas', value: updatedPathos });
      
      
    }
    else
    {
      const updatedPathos = user.my_personal_datas.map((obj) => {
        if (obj.id === id_p) {
          return {
            ...obj,
            symptoms: obj.symptoms.filter((symptom) => symptom.id !== item.id),
          };
        }
        return obj;
      });
      actions.editUserProfile({ key: 'my_personal_datas', value: updatedPathos });
       
    }
  },[isChecked]);
  const handleIsChecked = () => {
    setIsChecked(!isChecked);
  }
  return (
    <TouchableOpacity
    key={index}
    style={[styles.itemContainer, isChecked && styles.checkedItemContainer]}
    onPress={handleIsChecked}
  >
    <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
      {isChecked && <Entypo name="check" size={24} color="#ffffff" style={{}}/>}
    </View>
    <View style={styles.itemTitleContainer}>
      <AppText style={styles.itemTitle} text={item.name} />
    </View>
  </TouchableOpacity>
  )
}
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
  useEffect(()=>{
    console.log("Les symptomes d'objet " + objet.symptoms.length)
  },[])
  return (
    <View>
      <BoxHistorique objet={objet} isWhite/>
      {ButtonEdit?
                  <View>
                  <ScrollView>
                    
                  {
                    pathologieJSON.find((obj)=> obj.id === objet.id)?.symptoms.map((s,idx)=>{
                      const sFound = symptomeJSON.find((obj)=> obj.id === s.id);
                      if(sFound)
                      {const sFoundSymp : Symptome = sFound;
                      return <ScrollItem index={idx} item={sFoundSymp} id_p={objet.id} />
                      }
                    })
                    }
                 
                </ScrollView>
                 <Button
                 text={i18n.t('commons.validate')}
                 onPress={()=>{setButtonEdit(false)}}
                 isValidate
                 stretch
                 
               />
               </View>
                 : <ListSymptome objets={objet.symptoms} onPress={onPress}/>}
      

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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff', // Set the white background color for each item
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  itemIconContainer: {
    marginRight: 16,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000', // Set the color of the title
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#00cc00',
    borderRadius: 4,
    marginRight: 16,
  },
  checkedCheckbox: {
    backgroundColor: '#00cc00',
    borderColor: '#ffffff',
  },
  checkedItemContainer: {
    // backgroundColor: '#00cc00',
  },
});

export default RecapSuivi;