import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

type Symptome = {
  id: number;
  name: string;
  type: string;
};

type Pathologie = {
  id: string;
  name: string;
  symptoms: Symptome[];
};

type Props = {
  objets: (Pathologie[] | Symptome[]);
  ischeckeable: boolean;
};

const DropDownMenu = ({ objets, ischeckeable }: Props) => {
  const isPathologie = Array.isArray(objets) && objets.length > 0 && 'symptoms' in objets[0];
  const [checkedArray, setCheckedArray] = useState<boolean[]>([]);
  const handleCheckboxChange = (index: number, objet: Pathologie | Symptome) => {
    const updatedCheckedArray = [...checkedArray];
    if ('symptoms' in objet) {
      
      updatedCheckedArray[index] = true;
    } else {
     
      updatedCheckedArray[index] = true;
    }
  
    setCheckedArray(updatedCheckedArray);
  };
  

  
  return (
    <SafeAreaView>
    <ScrollView>
      {objets.map((objet, index) => {
        if (isPathologie) {
          const pathologie = objet as Pathologie;
          return (
            <BoxPathologie
              key={index}
              objet={pathologie}
              objets={pathologie.symptoms}
              ischeckeable={checkedArray[index]}
              onCheckboxChange={() => handleCheckboxChange(index,objet)}
            />
          );
        } else {
          const symptome = objet as Symptome;
          return (
            <BoxPathologie
              key={index}
              objet={symptome}
              ischeckeable={checkedArray[index]}
              onCheckboxChange={() => handleCheckboxChange(index,objet)}
            />
          );
        }
      })}
    </ScrollView>
    </SafeAreaView>
  );
};

export default DropDownMenu;