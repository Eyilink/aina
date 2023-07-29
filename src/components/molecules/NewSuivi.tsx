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
  setButtonNewSuiviClicked ?: React.Dispatch<React.SetStateAction<boolean>>;
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
const NewSuivi = ({ isFirstLog, onPress,setButtonNewSuiviClicked }: Props) => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  const [, actions] = useAuthStore(); 
  
  const handlePress = () => {
     // handlePress is called when the ADD button is clicked.
    
    setButtonClicked(!ButtonClicked);
  };

  const ValidatePressed = () => {
     // ValidatePressed is called when the validation button is clicked.
    // You can add your logic or actions here
    setButtonClicked(!ButtonClicked);
    if (isFirstLog) {
      actions.signupUser();
    }
    onPress ? onPress() : null;
  };
  
  return (
    <View style={styles.container}>
    {/* <AppText text='Choix du Suivi' style={styles.text}></AppText> */}
    {ButtonClicked ? (
      // When ButtonClicked is true, render the DropDownMenu component with checkable items
        <> 
      <SafeAreaView>
        <ScrollView>
          <DropDownMenu objets={pathologieJSON} ischeckeable={true}/> 
        </ScrollView>

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
    marginTop: -40
  },
});

