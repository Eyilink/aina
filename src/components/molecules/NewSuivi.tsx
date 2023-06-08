import React from 'react';
import { AsyncStorage, SafeAreaView, StyleSheet, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';



import pathologiesJSON from '@assets/json/pathologies.json'
import symptomsJSON from '@assets/json/symptomes.json'
import DropDownMenu from './DropDownMenu';
import AddBoutton from '@components/atoms/AddBoutton';
import Container from './Container';
import i18n from '@i18n/i18n';
import layout from '@styles/layout';
import fonts from '@styles/fonts';
import Button from '@components/atoms/Button';
import { useAuthStore } from '@store/store';
import { ASYNC_STORAGE_AUTH_KEY } from '@constants/constants';
import { StoreActionApi } from 'react-sweet-state';
import { RootState } from '@store/types';
import AppText from '@components/atoms/AppText';
import ScrollDownMenu from './ScrollDownMenu';

type StoreApi = StoreActionApi<RootState>;

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
  isFirstLog?: boolean;
};
const dropdownItems = [
  { title: 'Personnalisé', icon: require('@assets/images/1_i.png') },
  { title: 'Dentaire', icon: require('@assets/images/2_i.png') },
  { title: 'Articulaire', icon: require('@assets/images/3_i.png') },
  { title: 'Dermatologie', icon: require('@assets/images/4_i.png') },
  { title: 'Gynécologie', icon: require('@assets/images/5_i.png') },
  { title: 'Cardiovasculaire', icon: require('@assets/images/6_i.png') },
  // Add more items as needed
];
const NewSuivi = ({ isFirstLog }: Props) => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  const [, actions] = useAuthStore();

  const symptomeData: Symptome[] = symptomsJSON.map((item: Symptome) => ({
    id: item.id,
    name: item.name,
    type: item.type,
  }));
  const pathologieData: Pathologie[] = pathologiesJSON.map((item: any) => ({
    id: item.id,
    name: item.name,
//    symptoms: symptomeData.filter((symptome: Symptome) => symptome.id == item.symptoms.trim().split(",")),
    symptoms: symptomeData.filter((symptome: Symptome) => item.symptoms.trim().split(",").includes(String(symptome.id)))
  }));

  const handlePress = () => {
    //     // Fonction vide qui s'active lorsque vous cliquez sur le bouton ADD
    //     // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
  };

  const ValidatePressed = () => {
    // Fonction vide qui s'active lorsque vous cliquez sur le bouton Validé
    // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
    if (isFirstLog) {
      actions.signupUser();
    }
  };
  
  return (
    <View style={styles.container}>
    <AppText text='Choix du Suivi' style={styles.text}></AppText>
    {ButtonClicked ? (<> 
      <SafeAreaView>
        <ScrollView>
          <DropDownMenu objets={pathologieData} ischeckeable={true}/> 
        </ScrollView>
        <Button
          text={i18n.t('commons.validate')}
          onPress={ValidatePressed}
          isValidate
          stretch
        />
    </SafeAreaView>
    </>) : (
    <>
      {/* <DropDownMenu objets={pathologieData} ischeckeable={false}/> */}
      {/* <AddBoutton onPress={handlePress} style={styles.button}></AddBoutton> */}
      <ScrollDownMenu items={dropdownItems} />
      <Button
          text={i18n.t('commons.validate')}
          onPress={()=>{}}
          isValidate
          stretch
          style={{marginBottom: -10}}
        />
    </>
    )}
  </View>
  );
};

export default NewSuivi;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.title.fontFamily,
    fontSize: fonts.title.fontSize,
  // Added fontWeight to make the text bold
    textAlign: 'center',
    marginTop: -40,
    marginBottom:30 // Added textAlign to center the text horizontally
  },
  container: {
    flex: 1,
    paddingVertical: layout.padding,

  },
  subtitle: {
    marginTop: layout.padding * 2,
    fontSize: fonts.sections.fontSize,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

