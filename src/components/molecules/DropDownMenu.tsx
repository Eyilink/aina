import React from 'react';
import { View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';

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
  console.log(objets);
  console.log(isPathologie);
  if (isPathologie){
    const pathologie = objets[0] as Pathologie;
    console.log(pathologie.symptoms[0]);
  }

  
  return (
    <View>
      {objets.map((objet, index) => {
        if (isPathologie) {
          const pathologie = objet as Pathologie;
          return (
            <BoxPathologie
              key={index}
              objet={pathologie}
              objets={pathologie.symptoms}
              ischeckeable={ischeckeable}
            />
          );
        } else {
          const symptome = objet as Symptome;
          return (
            <BoxPathologie
              key={index}
              objet={symptome}
              ischeckeable={ischeckeable}
            />
          );
        }
      })}
    </View>
  );
};

export default DropDownMenu;