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
  ischeckeable : boolean;
};

const DropDownMenu = ({ objets, objets2,ischeckeable }: Props) => {
    
    return (
        <View>
            {objets2 ? (objets.map((objet, index) => (
                <BoxPathologie key={index} objet={objet} objets={objets2} ischeckeable={ischeckeable} />
            ))): 
            (objets.map((objet, index) => (
                <BoxPathologie key={index} objet={objet} ischeckeable={ischeckeable} />
            )))
            }
        
        </View>
    );
};

export default DropDownMenu;