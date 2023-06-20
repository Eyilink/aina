import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, ImageSourcePropType , Image } from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import Button from '@components/atoms/Button';
import { he } from 'date-fns/locale';
import layout from '@styles/layout';
import CustomSlider from '@components/molecules/Slider';
import {  MALADIE1 } from '@constants/constants';
import { useReportsStore, useUserStore } from '@store/store';
import { Pathologie, Symptome } from '@store/types';
import InputSymptome from '@components/molecules/AskSymptoms'
type Props = {
  currentSymptom: Symptome;
};

const data = [
  { id: 1, title: 'Pathologie', subtitle: 'Coude-Gauche' },
  { id: 1, title: 'Pathologie', subtitle: 'Coude-Gauche' },
  // Add more data items as needed
];
const symptomsData = [
  { id: 1, title: 'Articulation', subtitle: 'Coude-Gauche' },
  { id: 2, title: 'Articulation', subtitle: 'Coude-Gauche' },
  // Add more symptom items as needed
];

// type CustomComponentProps = {
//   title: string;
//   subtitle: string;
// };

const CustomComponent = ({ currentSymptom }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  const [value, setValue] = useState(1);

// The handleValue function is a callback function that updates the value state based on the provided value parameter.
// It takes a number as an argument and sets the value state to that number using the setValue function.
// This function is typically used to update the value in response to user interactions or data changes.
  const handleValue = (value: number) => {
    setValue(value);
  }

// Same 
  const handlePress = () => {
    console.log(currentSymptom.name);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  // secondary function which changes the color of the picto
  const generatePictogrammeTemperature = (value: number ) => {
    let backgroundColor;
    console.log(value);
    value=Math.floor(value);
    console.log(value);
    if (value === 1 ||value === 2  ) {
    
      backgroundColor= '#00FF00'; //Green 
    }
     else if (value === 3 || value ===  4 || value === 5 || value == 6 ) {
      backgroundColor = '#FFFF00'; // Yellow
    } else {
      backgroundColor = '#FF0000'; // Red
    }

    return backgroundColor;
  };

  return (
    <View style={styles.customComponentContainer}>
      <View style={{ width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor:generatePictogrammeTemperature(value) ,
    marginRight: 20,}} />
      <View style={styles.textContainer}>
        <Text style={styles.title_custom}>{currentSymptom.name}</Text>
      </View>
      <Button text="+" onPress={handlePress} style={styles.addButton} />

      <Modal 
        visible={isModalVisible} 
        animationType="slide" 
        transparent
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        // animationIn="slideInDown"
        // animationOut="slideOutUp"
        >

        <View style={styles.modalContainer}>
          <InputSymptome s={currentSymptom} onClose={closeModal} />
        </View>
      </Modal>
      
      
      
    </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;

// const SliderExample = () => {
//   const [sliderValue, setSliderValue] = useState(1);

//   // const handleSliderChange = (value) => {
//   //   setSliderValue(value);
//   // };

//   return (
//     <View style={styls.container}>
//       <View style={styls.slider}>
//         <View style={styls.redPoint} />
//         <View style={styls.sliderTrack} />
//         <View style={[styls.sliderValue, { width: ((SCREEN_WIDTH / 2) * sliderValue) / 10 }]} />
//         <View style={styls.redPoint} />
//       </View>
//     </View>
//   );
// };

const styls = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2,
    alignSelf: 'center',
  },
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  redPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  sliderTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#c0c0c0',
  },
  sliderValue: {
    height: 6,
    backgroundColor: '#ffc000',
    borderRadius: 3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


type Item = {
  id: number;
  title: string;
  subtitle: string;
};
const getIconPath = (iconName: string): ImageSourcePropType => {
  switch (iconName) {
    case 'avq.png':
      return require('@assets/images/avq.png');
    case 'barthel.png':
      return require('@assets/images/barthel.png');
    case 'braden.png':
      return require('@assets/images/braden.png');
    case 'clinimetre.png':
      return require('@assets/images/clinimetre.png');
    case 'coeur.png':
      return require('@assets/images/coeur.png');
    case 'colonne.png':
      return require('@assets/images/colonne.png');
    case 'covid.png' :
      return require('@assets/images/covid.png');
    case 'dentaire.png' :
      return require('@assets/images/dentaire.png');
    case 'genou.png' :
      return require('@assets/images/genou.png');
    case 'grippe.png' :
      return require('@assets/images/grippe.png');
    case 'grossesse.png' :
      return require('@assets/images/grossesse.png');
    case 'insh.png' :
      return require('@assets/images/insh.png');
    case 'mif.png' :
      return require('@assets/images/mif.png');
    case 'orl.png' :
      return require('@assets/images/orl.png');
    case 'peau.png' :
      return require('@assets/images/peau.png');
    case 'poumon.png' :
      return require('@assets/images/poumon.png');
    case 'yeux.png' :
      return require('@assets/images/yeux.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};
const renderItem = ({ item }: { item: Pathologie }) => (
  <View style={styles.custom}>
    <View style={styles.itemContainer}>
    <Image
         style={{ width: 40, height: 40 }}
         source={item?.namelogo ? getIconPath(item.namelogo) : getIconPath('')}
              />
      <View style={styles.textContainer}>
        {/* Affichage nom de la pathologie */}
        <Text style={styles.title_comp}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.more}</Text>
      </View>
    </View>
    <View style={styles.Symptome}>
    {item.symptoms.map((item) => (
      <CustomComponent currentSymptom={item} />
    ))}
    </View>
  </View>
);

function HistoryFollowedSymptoms({}: Props) {
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  
  return (
    <View style={styles.container}>
      <FlatList
        data={user.my_personal_datas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  Symptome: {
    flexDirection:'column',
    textAlign: 'left',
    marginRight: 15,
  },
  flatListContainer: {
    flexGrow: 1,
    textAlign: 'left',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    marginBottom: '60%',
  },
  title_custom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    marginRight: 20,
  },
  redText: {
    color: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 30,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title_comp: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
  },
  subtitle_custom: {
    fontSize: 10,
  },

  customComponentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  custom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    padding: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#92c026',
    marginRight: 20,
  },
  addButton: {
    marginLeft: 'auto',
    paddingHorizontal: layout.padding / 2,
    paddingVertical: layout.padding / 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  lines: {
    flexDirection: 'row',
    
    
    zIndex: 1,
  },
  lineExtremity: {
    borderLeftWidth: 1,
    height: 30,
    borderLeftColor: 'black',
    // marginTop: PHONE_OS === 'ios' ? -35 : -25,
    // marginHorizontal: PHONE_OS === 'ios' ? 0 : 15,
  },
  line: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    height: 20,
    // marginTop: PHONE_OS === 'ios' ? -30 : -20,
  },
});

export default HistoryFollowedSymptoms;
