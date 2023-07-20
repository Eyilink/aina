import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Pathologie, Symptome } from '@store/types';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';

type Props = {
  objets: (Pathologie[] | Symptome[]);
  ischeckeable: boolean;
  onValidatePressed?: () => void;
};
// The DropDownMenu component renders a list of BoxPathologie components based on the provided objets prop.
// It determines whether the objets are Pathologie or Symptome based on their structure.
// It manages the checkbox state through the checkedArray state variable and updates it when the checkbox state changes.
// The component handles both Pathologie and Symptome objects accordingly and passes the necessary props to the BoxPathologie components.
// This component is typically used to display a dropdown menu with selectable items.
const DropDownMenu = ({ objets, ischeckeable, onValidatePressed }: Props) => {
  const isPathologie = Array.isArray(objets) && objets.length > 0 && 'symptoms' in objets[0];
  const [checkedArray, setCheckedArray] = useState<boolean[]>([]);
  
  
  // Function to handle checkbox state changes
  const handleCheckboxChange = (index: number, objet: Pathologie | Symptome) => {
    const updatedCheckedArray = [...checkedArray];
    if ('symptoms' in objet) {
      
      updatedCheckedArray[index] = true;// Set the checkbox state to true for Pathologie objects
    } else {
     
      updatedCheckedArray[index] = true;// Set the checkbox state to true for Symptome objects
    }
  
    setCheckedArray(updatedCheckedArray);
  };
  const ValidatePressed = () => {
    // Perform actions when the validate button is pressed
    if (onValidatePressed) {
      onValidatePressed();
    }
  };



  return (

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
       {/* <Button
          text={i18n.t('commons.validate')}
          onPress={ValidatePressed}
          isValidate
          stretch
        /> */}
    </ScrollView>

  );
};

export default DropDownMenu;