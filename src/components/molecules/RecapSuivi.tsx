import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import BoxHistorique from '@components/atoms/BoxHistorique';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';
import ListSymptome from '@components/atoms/ListSymptome';
import { Pathologie } from '@store/types';

type Props = {
  objet: Pathologie;
};

const RecapSuivi = ({ objet }: Props) => {
  
  return (
    <View>
      <BoxHistorique objet={objet}/>

      <ListSymptome objets={objet.symptoms}/>

      <Button text={i18n.t('suivi.end')} 
              isSelected
              onPress={function (): void {
                throw new Error('Function not implemented.');
              } } 
      />
    </View>
  );
};

export default RecapSuivi;