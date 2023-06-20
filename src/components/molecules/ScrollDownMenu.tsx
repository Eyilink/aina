import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';
import AppText from '@components/atoms/AppText';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import Button from '@components/atoms/Button';
import { useAuthStore, useUserStore } from '@store/store';
import { CGU_URL, DATE_TODAY, MALADIE1, pathologieJSON, symptomeJSON } from '@constants/constants';
import { useNavigation } from '@react-navigation/native';
import json_p from '@assets/json/pathologies.json'
import { Pathologie, Symptome } from '@store/types';
import colors from '@styles/colors';
interface DropdownItem {
  title: string;
  icon: ImageSourcePropType;
}

interface DropdownMenuProps {
  items: Pathologie[];
  setButtonNewSuiviClicked? : React.Dispatch<React.SetStateAction<boolean>>;
  
}

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
    useEffect(()=>{
        const checked = twoDArray.some((obj) => obj[0] === id_p && obj.slice(1).includes(symptom.id.toString()));
        
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
const getIconPath = (iconName: string): ImageSourcePropType => {
  switch (iconName) {
    case 'avq.png':
      return require('@assets/images/avq.png');
    case 'barthel.png':
      return require('@assets/images/barthel.png');
    case 'braden.png':
      return require('@assets/images/braden.png');
    case 'clinimetre.png':
      return require('@assets/images/clinimetre.png');
    case 'coeur.png':
      return require('@assets/images/coeur.png');
    case 'colonne.png':
      return require('@assets/images/colonne.png');
    case 'covid.png' :
      return require('@assets/images/covid.png');
    case 'dentaire.png' :
      return require('@assets/images/dentaire.png');
    case 'genou.png' :
      return require('@assets/images/genou.png');
    case 'grippe.png' :
      return require('@assets/images/grippe.png');
    case 'grossesse.png' :
      return require('@assets/images/grossesse.png');
    case 'insh.png' :
      return require('@assets/images/insh.png');
    case 'mif.png' :
      return require('@assets/images/mif.png');
    case 'orl.png' :
      return require('@assets/images/orl.png');
    case 'peau.png' :
      return require('@assets/images/peau.png');
    case 'poumon.png' :
      return require('@assets/images/poumon.png');
    case 'yeux.png' :
      return require('@assets/images/yeux.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};

const ScrollDownMenu: React.FC<DropdownMenuProps> = ({ items,setButtonNewSuiviClicked }) => {
  const [isSymptom, setIsSymptom] = useState<boolean>(false);
  const [isWhichP , setIsWichP] = useState<string>("");
  const [twoDArray, setTDArray] = useState<string[][]>([]);
  const [, actions] = useAuthStore();
  const [user, ] = useUserStore({ disease: MALADIE1 });
  const [render, setRender] = useState<boolean>(false);

  
  const handleItemPress = (id : string) => {
    setIsSymptom(true);
    setIsWichP(id);
  };

  
  const processDatas = () => {
    const updatedPathos = twoDArray.map((objet, index) => {
      const nm = pathologieJSON.find((obj) => obj.id === objet[0])?.name;
      const newE: Pathologie = {
        id: objet[0],
        name: nm ? nm : "",
        symptoms: symptomeJSON
          .filter((obj) => objet.slice(1).includes(obj.id.toString()))
          .map((filteredObj) => ({
            id: filteredObj.id,
            name: filteredObj.name,
            type: filteredObj.type,
          })),
        icon: getIconPath(
          pathologieJSON.find((obj) => obj.id === objet[0])?.namelogo?.toString()
        ),
        date: DATE_TODAY,
        namelogo: json_p.find((obj)=>obj.id.toString() == objet[0])?.logo, 
      };
      return newE;
    });

    actions.editUserProfile({ key: 'my_personal_datas', value: updatedPathos });
  };
  
  const handleArrowClick = () => {
    setIsSymptom(!isSymptom);
  };
  const handleButtonPress = () => {
    processDatas();
   if(setButtonNewSuiviClicked)
   {
     setButtonNewSuiviClicked(false);
     actions.signupUser();
   }

  };
  useEffect(()=>{
    setRender(true);
    console.log(twoDArray)
  },[twoDArray])
  useEffect(()=>{
    console.log("In useeffect ...");
    if(user.my_personal_datas)
    {
      user.my_personal_datas.map((obj,ind)=>{
        const updatedArray = [obj.id];
        obj.symptoms.map((s, index) => {
          updatedArray.push(s.id.toString());
        });

        
        twoDArray.push(updatedArray);
        
      })
      
    }
    console.log("After useeffect ...");
  },[]);
  return render ? (
    
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
                    <Chk_Box key={idx} index={idx} symptom={symptom} id_p={item.id} twoDArray={twoDArray} setTDArray={setTDArray} pressingChkBx={()=>{}}/>
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
            style={[
              styles.itemContainer,
              user.my_personal_datas?.find((obj) => obj.id === item.id)
                ? { backgroundColor: colors.primary }
                : null,
            ]}
            onPress={() => handleItemPress(item.id)}
          >
            <View style={styles.itemIconContainer}>
              <Image
                style={{ width: 40, height: 40 }}
                source={item?.icon ? item.icon : getIconPath('')}
              />
            </View>
            <View style={styles.itemTitleContainer}>
              <AppText style={styles.itemTitle} text={item.name ? item.name : ''} />
            </View>
          </TouchableOpacity>
          
          ))}
        </ScrollView>
      )}
      </View>
      {!isSymptom &&
      <Button
          text={i18n.t('commons.validate')}
          onPress={()=>{handleButtonPress();}}
          isValidate
          stretch
          style={{marginTop: 10}}
        />
      }
      
    </View>
  ) : null;
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
