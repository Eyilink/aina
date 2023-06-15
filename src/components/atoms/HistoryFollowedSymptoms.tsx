import React, { useState } from 'react';
import { View, Text,Dimensions, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Button from '@components/atoms/Button';
import { he } from 'date-fns/locale';
import layout from '@styles/layout';
import CustomSlider from '@components/molecules/Slider';
import {  MALADIE1 } from '@constants/constants';
import { useReportsStore, useUserStore } from '@store/store';
import { Pathologie } from '@store/types';
type Props = {};
// import {value} from '@components/molecules/Slider';

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

type CustomComponentProps = {
  title: string;
  subtitle: string;
};
const CustomComponent = ({ title, subtitle }: CustomComponentProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, actions] = useUserStore({ disease: MALADIE1 });

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const generatePictogrammeTemperature = (value: number ) => {
    let backgroundColor;
    console.log(value);
    value=Math.floor(value);
    if (value === 1 ||value === 2  ) {
    
      backgroundColor= '#00FF00'; //vert
    }
     else if (value === 3 || value ===  4 || value === 5 || value == 6 ) {
      backgroundColor = '#FFFF00'; // Jaune
    } else {
      backgroundColor = '#FF0000'; // Rouge
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
        <Text style={styles.title_custom}>{title}</Text>
        <Text style={styles.subtitle_custom}>{subtitle}</Text>
      </View>
      <Button text="+" onPress={handlePress} style={styles.addButton} />
      <Modal visible={isModalVisible} transparent>
       
            <CustomSlider isVisible onCancel={() => { } } onConfirm={closeModal}
        step={1}
        initialValue={1}
        type='temperature'
        min={1}
        max={10}
        title='Temperature'
        hasPainSymptoms={false}  
        value={value}   
        handleValue={handleValue} 
        roundvalue={value}    
            />
      </Modal>
    </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const SliderExample = () => {
  const [sliderValue, setSliderValue] = useState(1);

  // const handleSliderChange = (value) => {
  //   setSliderValue(value);
  // };

  return (
    <View style={styls.container}>
      <View style={styls.slider}>
        <View style={styls.redPoint} />
        <View style={styls.sliderTrack} />
        <View style={[styls.sliderValue, { width: ((SCREEN_WIDTH / 2) * sliderValue) / 10 }]} />
        <View style={styls.redPoint} />
      </View>
    </View>
  );
};

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
});


type Item = {
  id: number;
  title: string;
  subtitle: string;
};

const renderItem = ({ item }: { item: Pathologie }) => (
  <View style={styles.custom}>
    <View style={styles.itemContainer}>
      <AntDesign name="forward" size={24} color="#ffc000" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title_comp}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.more}</Text>
      </View>
    </View>
    <View style={styles.Symptome}>
    {item.symptoms.map((item) => (
      <CustomComponent key={item.id}  title={item.name} subtitle={item.name} />
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
