import React from 'react';
import { AsyncStorage, ImageSourcePropType, SafeAreaView, StyleSheet, View } from 'react-native';
import BoxPathologie from '../atoms/BoxPathologie';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownMenu from './DropDownMenu';
import AddBoutton from '@components/atoms/AddBoutton';
import Container from './Container';
import i18n from '@i18n/i18n';
import layout from '@styles/layout';
import fonts from '@styles/fonts';
import Button from '@components/atoms/Button';
import { useAuthStore } from '@store/store';
import { ASYNC_STORAGE_AUTH_KEY, pathologieJSON } from '@constants/constants';
import { StoreActionApi } from 'react-sweet-state';
import { RootState, SymptomeJSON } from '@store/types';
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
  icon: ImageSourcePropType
};

type Props = {
  isFirstLog?: boolean;
  onPress?: () => void;
  setButtonNewSuiviClicked : React.Dispatch<React.SetStateAction<boolean>>;
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
const getIconPath = (iconName: string): ImageSourcePropType => {
  switch (iconName) {
    case '1_i.png':
      return require('@assets/images/1_i.png');
    case '2_i.png':
      return require('@assets/images/2_i.png');
    case '3_i.png':
      return require('@assets/images/3_i.png');
    case '4_i.png':
      return require('@assets/images/4_i.png');
    case '5_i.png':
      return require('@assets/images/5_i.png');
    case '6_i.png':
      return require('@assets/images/6_i.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};
const NewSuivi = ({ isFirstLog, onPress,setButtonNewSuiviClicked }: Props) => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  const [, actions] = useAuthStore(); 
  
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
    onPress ? onPress() : null;
  };
  
  return (
    <View style={styles.container}>
    <AppText text='Choix du Suivi' style={styles.text}></AppText>
    {ButtonClicked ? (<> 
      <SafeAreaView>
        <ScrollView>
          <DropDownMenu objets={pathologieJSON} ischeckeable={true}/> 
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
      <ScrollDownMenu items={pathologieJSON} setButtonNewSuiviClicked={setButtonNewSuiviClicked}/>
     
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

