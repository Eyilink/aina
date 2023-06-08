import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import BoxHistorique from '@components/atoms/BoxHistorique';
import Button from '@components/atoms/Button';
import i18n from '@i18n/i18n';

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
  objet: Pathologie;
};

const RecapSuivi = ({ objet }: Props) => {
  
  return (
    <View>
      <BoxHistorique objet={{
        nom: 'Nathan',
        more: 'Prud\'homme',
        namelogo: 'picture',
        symp: [{nom: 'Nath', date: '07/06', valeur: 10}]
      }}/>

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