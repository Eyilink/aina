
import React , {ReactElement, useEffect } from 'react'
import { View ,Text} from 'react-native';


import symptomes from '@assets/json/symptomes.json'



const DropdownMenu = (): ReactElement => {
  
   useEffect(() => {
    console.log(symptomes);
  }, []);
  return (
    <View>
        <Text>{symptomes.map((symptome,index)=>{
            return symptome["name"];
        })}</Text>
       
    </View>
  );
};

export default DropdownMenu;
