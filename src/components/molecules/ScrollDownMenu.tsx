import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';
import AppText from '@components/atoms/AppText';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import Button from '@components/atoms/Button';
import { useAuthStore, useUserStore } from '@store/store';
import { CGU_URL, MALADIE1 } from '@constants/constants';
import pathos from '@assets/json/pathologies.json';
interface DropdownItem {
  title: string;
  icon: ImageSourcePropType;
}
type Symptome = {
    id: number;
    name: string;
    type: string;
  };
interface Pathologie  {
    id: string;
    name: string;
    symptoms: Symptome[];
    icon: ImageSourcePropType
  };
interface DropdownMenuProps {
  items: Pathologie[];
  
}

interface chk_BoxProps {
    index: number;
    symptom: Symptome;
    id_p: string;
    twoDArray: string[][];
    setTDArray: React.Dispatch<React.SetStateAction<string[][]>>;
  }


const Chk_Box : React.FC<chk_BoxProps> = ({index,symptom,id_p, twoDArray,setTDArray }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    useEffect(()=>{
        const checked = twoDArray.some((obj) => obj[0] === id_p && obj.slice(1).includes(symptom.id.toString()));
        setIsChecked(checked);
        console.log(twoDArray)
    },[])
    const handleIsChecked = () => {
        setIsChecked(!isChecked);

        // if(isChecked){
        const existingObject = twoDArray.find((obj) => obj[0] === id_p);
        const existingSymptom = twoDArray.find((obj) => obj.slice(1).includes(symptom.id.toString()));
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
                const updatedArray = [...twoDArray , [id_p,symptom.id.toString()]];
                setTDArray(updatedArray);
            }
            // };
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

const ScrollDownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  const [isSymptom, setIsSymptom] = useState<boolean>(false);
  const [isWhichP , setIsWichP] = useState<string>("");
  const [twoDArray, setTDArray] = useState<string[][]>([]);
  const [, actions] = useAuthStore();
  const [user, ] = useUserStore({ disease: MALADIE1 });


  const handleItemPress = (id : string) => {
    setIsSymptom(true);
    setIsWichP(id);
  };

  
  const processDatas = () => {
    const pathos : Pathologie[] = [];
    twoDArray.map((objet,index)=>{
      const newE : Pathologie = {
        id: objet[0],
        name: ,
        symptoms: Symptome[],
        icon: ImageSourcePropType
      }
    });
    actions.editUserProfile({ key: 'my_personal_datas', value: twoDArray });
    console.log(user.my_personal_datas)

  };
  const handleArrowClick = () => {
    setIsSymptom(!isSymptom);
  };

  return (
    <View style={styles.container}>
        <View style={styles.or_background}>
      {isSymptom && (
        <TouchableOpacity style={styles.arrowContainer} onPress={handleArrowClick}>
          <AntDesign style={styles.arrowContainer} name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      {isSymptom ? (
        <ScrollView>
          {items.map((item, index) => {
            if (isWhichP === item.id) {
              return (
                <React.Fragment key={index}>
                  {item.symptoms.map((symptom, idx) => (
                    <Chk_Box key={idx} index={idx} symptom={symptom} id_p={item.id} twoDArray={twoDArray} setTDArray={setTDArray} />
                  ))}
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </ScrollView>
      ) : (
        <ScrollView>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={()=>handleItemPress(item.id)}
            >
              <View style={styles.itemIconContainer}>
                <Image style={{ width: 40, height: 40 }} source={item.icon} />
              </View>
              <View style={styles.itemTitleContainer}>
                <AppText style={styles.itemTitle} text={item.name} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      </View>
      {!isSymptom &&
      <Button
          text={i18n.t('commons.validate')}
          onPress={()=>{processDatas()}}
          isValidate
          stretch
          style={{marginTop: 10}}
        />
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, },
    or_background:{
    backgroundColor: '#f2f2f2', // Set the gray background color
  },
  arrowContainer: {
    alignItems: 'flex-start',
    paddingLeft: 16,
    paddingTop: 16,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    // Add styles for the arrow icon, such as color or custom image
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

export default ScrollDownMenu;
