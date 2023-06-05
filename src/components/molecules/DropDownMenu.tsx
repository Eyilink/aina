import React from 'react';
import { View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie'

type Symptome = {
    id: number;
    name: string;
    type: string;
}
  
interface Pathologie {
    id: string;
    name: string;
    symptoms: Symptome[];
}

type Props = {
  objets: Pathologie[]|Symptome[];
  ischeckeable : boolean;
};


const DropDownMenu = ({ objets,ischeckeable }: Props) => {
    const [isPathologie, setIsPathologie] = React.useState(false);
    if ('type' in objets[0]) {
        setIsPathologie(true);
    }
    else {
        setIsPathologie(false);
        const pathologie: any = objets
    }
      
    return (
        <View>
            {'symptoms' in objets[0] ? (objets.map((objet, index) => (
                <BoxPathologie key={index} objet={objet} objets={objet.symptoms} ischeckeable={ischeckeable} />
            ))): 
            (objets.map((objet, index) => (
                <BoxPathologie key={index} objet={objet} ischeckeable={ischeckeable} />
            )))
            }
        
        </View>
    );
};

export default DropDownMenu;

