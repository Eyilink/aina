import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import { Pathologie, Symptome } from '@store/types';

type Props = {
  objets: (Pathologie[] | Symptome[]);
  ischeckeable: boolean;
};

const DropDownMenu = ({ objets, ischeckeable }: Props) => {
  const isPathologie = Array.isArray(objets) && objets.length > 0 && 'symptoms' in objets[0];
  

  
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
    </ScrollView>
    </SafeAreaView>
  );
};

export default DropDownMenu;