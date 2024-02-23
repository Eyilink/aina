import Button from '@components/atoms/Button';
import { DATE_TODAY, MALADIE1, getIconPath, pathologieJSON, symptomeJSON } from '@constants/constants';
import { useAuthStore, useUserStore } from '@store/store';
import { Pathologie, Symptome } from '@store/types';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import InputSymptome from '@components/molecules/AskSymptoms';
import json_p from '@assets/json/pathologies.json'
import { ImageContext } from '@components/molecules/ImageContext';
import { Entypo } from '@expo/vector-icons';




interface chk_BoxProps {
  index: number;
  symptom: Symptome;
  id_p: string;
  twoDArray: string[][];
  setTDArray: React.Dispatch<React.SetStateAction<string[][]>>;
  pressingChkBx: () => void;
}


export const Chk_Box : React.FC<chk_BoxProps> = ({index,symptom,id_p, twoDArray,setTDArray,pressingChkBx }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {imageProp,setImageProp} = useContext(ImageContext);
  useEffect(()=>{
    // Check if the symptom is already selected by the user
      const checked = twoDArray.some((obj) => obj[0] === id_p && obj.slice(1).includes(symptom.id.toString()));
      const path = json_p.find((item)=>item.id.toString() == id_p);
      if(path)
        setImageProp(path.logo);
      setIsChecked(checked);

  },[])
  const handleIsChecked = () => {
      setIsChecked(!isChecked);

      // if(isChecked){
      const existingObject = twoDArray.find((obj) => obj[0] === id_p);
      const existingSymptom = twoDArray.find((obj) => obj[0] === id_p && obj.slice(1).includes(symptom.id.toString()));
      if(!existingSymptom)
          if (existingObject) {
              // Object with id_p exists, append symptomId to the second dimension
              const updatedArray = twoDArray.map((obj) => {
              if (obj[0] === id_p) {
                  return [...obj,symptom.id.toString() ];
              }
              return obj;
              });
              setTDArray(updatedArray);
          } else {
            // Object with id_p does not exist, create a new object with id_p and symptomId
              const updatedArray = [...twoDArray , [id_p,symptom.id.toString()]];
              setTDArray(updatedArray);
          }
          // };
          pressingChkBx();
         
    };
  
  return(
      <TouchableOpacity
      key={index}
      style={[styles.itemContainer, isChecked && styles.checkedItemContainer]}
      onPress={handleIsChecked}
    >
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <Entypo name="check" size={24} color="#ffffff" style={{}}/>}
      </View>
      <View style={styles.itemTitleContainer}>
        <AppText style={styles.itemTitle} text={symptom.name} />
      </View>
    </TouchableOpacity>
  )

}


type Props = {
  isVisible: boolean;
  onClose: () => void;
};
const { height, width } = Dimensions.get('window');

const DataAddPopUp: React.FC<Props> = ({ isVisible, onClose }) => {
    const [yes,setYes] = useState(true);
    const [, actions] = useAuthStore();
    const [user, ] = useUserStore({ disease: MALADIE1 });
    const [symp,setSymp] = useState<Symptome | undefined>();
    const [twoDArray, setTDArray] = useState<string[][]>([]);
    const [addArray,setAddArray] = useState<string[]>([]);

    const processDatas = () => {
      user.my_personal_datas.forEach(p=>{
        addArray.push(p.id.toString());
        p.symptoms.forEach(s=>addArray.push(s.id.toString()));
        twoDArray.push(addArray);
        setAddArray([]);
      })
      const updatedPathos = twoDArray.map((objet, index) => {
        const nm = pathologieJSON.find((obj) => obj.id === objet[0])?.name;
        const pd_obj =  user.my_personal_datas?.find((obj)=>obj.id == objet[0]);
        const newE: Pathologie = {
          id: objet[0],
          name: nm ? nm : "",
          symptoms: symptomeJSON
            .filter((obj) => objet.slice(1).includes(obj.id.toString()))
            .map((filteredObj) => ({
              id: filteredObj.id,
              name: filteredObj.name,
              type: filteredObj.type,
              frequency: filteredObj.frequency,
              data: pd_obj ? pd_obj.symptoms.find((s)=> s.id == filteredObj.id)?.data : null,
              unit: filteredObj.unit,
              valMax: filteredObj.valMax,
              valMin: filteredObj.valMin
            })),
          icon: getIconPath(
            pathologieJSON.find((obj) => obj.id === objet[0])?.namelogo?.toString()
          ),
          date: user.my_personal_datas?.find((obj)=>obj.id == objet[0])?.date ? user.my_personal_datas.find((obj)=>obj.id == objet[0])?.date :  DATE_TODAY,
          namelogo: json_p.find((obj)=>obj.id.toString() == objet[0])?.logo, 
       
        };
        return newE;
      });
  
      actions.editUserProfile({ key: 'my_personal_datas', value: updatedPathos });
      console.log(updatedPathos)
    };

    
  const handleListItemClick = (item: Symptome) => {
    // Implement your logic here when an item is clicked
    console.log('Item clicked:', item);
    setSymp(item);
    setYes(false);
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        {yes ? (
          // Show the list of user.my_personal_data
          <View style={styles.popV}>
            <ScrollView>
              {pathologieJSON.find(p=> p.id == '21')?.symptoms.slice(20).map((item,idx) => (
                // <TouchableOpacity
                //   key={item.id}
                //   onPress={() => handleListItemClick(item)}
                //   style={styles.listItem}
                // >
                //   <AppText text={item.id.toString() + " - " +item.name} />
                // </TouchableOpacity>
                <Chk_Box
              key={idx}
              index={idx}
              symptom={item}
              id_p={'21'}
              twoDArray={twoDArray}
              setTDArray={setTDArray}
              pressingChkBx={() => {}}
            />
              ))}
            </ScrollView>
            <Button text={'Valider'} isSelected onPress={()=>{processDatas(); actions.saveUserProfile();onClose();}} />
          </View>
        ) : (
          // Show the text and back button when the item is clicked
          <View style={styles.popV}>
           {symp ? <InputSymptome s={symp} onClose={onClose} onArrow={()=>{setYes(true)}} /> : null }
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popV: {
    height: height*0.8,
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,

            // justifyContent: 'center',
            // alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0, // Align at the top
    left: 0, // Align at the left
    paddingVertical: 8,
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

export default DataAddPopUp;
