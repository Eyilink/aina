import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
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

const NewSuivi = () => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);

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
    //     // Fonction vide qui s'active lorsque vous cliquez sur le bouton Validé
    //     // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
  };
  
  return (
    <Container noMarginBottom>

    {ButtonClicked ? (<> 
      <SafeAreaView>
        <ScrollView>
          <DropDownMenu objets={pathologieData} ischeckeable={true}/> 
          <Button
            text={i18n.t('commons.validate')}
            onPress={ValidatePressed}
            isValidate
            stretch
          />
        </ScrollView>
    </SafeAreaView>
    </>) : (
    <>
      <DropDownMenu objets={pathologieData} ischeckeable={false}/>
      <AddBoutton onPress={handlePress} style={styles.button}></AddBoutton>
    </>
    )}
  </Container>
  );
};

export default NewSuivi;

const styles = StyleSheet.create({
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
