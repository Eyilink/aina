import React from 'react';
import { View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie'

type Symptome = {
    nom: string
}

type Pathologie = {
    nom: string
}

type Props = {
  objets: Pathologie[]|Symptome[];
  objets2?: Pathologie[]|Symptome[];
};

const DropDownMenu = ({ objets, objets2 }: Props) => {
    
    return (
        <View>
            {objets2 ? (objets.map((objet, index) => (
                <BoxPathologie key={index} objet={objet} objets={objets2} />
            ))): 
            (objets.map((objet, index) => (
                <BoxPathologie key={index} objet={objet} />
            )))
            }
        
        </View>
    );
};

export default DropDownMenu;
