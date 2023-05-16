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
};

const DropDownMenu = ({ objets }: Props) => {
    
    return (
        <View>
        {objets.map((objet, index) => (
            <BoxPathologie key={index} objet={objet} />
        ))}
        </View>
    );
};

export default DropDownMenu;
