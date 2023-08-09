import Button from '@components/atoms/Button';
import { MALADIE1, pathologieJSON } from '@constants/constants';
import { useUserStore } from '@store/store';
import { Pathologie, Symptome } from '@store/types';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import InputSymptome from '@components/molecules/AskSymptoms';
import { Path } from 'react-native-svg-charts';
import json_p from '@assets/json/pathologies.json'
import json_s from '@assets/json/symptomes.json'
import Symptoms from '@screens/Authenticated/Report/Symptoms';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};
const { height, width } = Dimensions.get('window');

const BilanAddPopUp: React.FC<Props> = ({ isVisible, onClose }) => {
  const [yes, setYes] = useState(true);
  const [sousBilan, setsousBilan] = useState(true);
  const [sympAffiche, setsympAffiche] = useState(true);
  const [user,] = useUserStore({ disease: MALADIE1 });
  const [path, setPath] = useState<Pathologie>();
  const [souspath, setsousPath] = useState<Pathologie>();
  const [symp, setSymp] = useState<Symptome>();

  const Init = () => {
    setYes(true);
    setsousBilan(true);
    setsympAffiche(true);
  }

  const handleListItemClick = (item: Pathologie) => {
    // Implement your logic here when an item is clicked
    console.log('Item clicked:', item);
    setPath(item);
    setYes(false);
    console.log(path);
  };


  const handleListItemClickSousBilan = (item: Pathologie) => {
    // Implement your logic here when an item is clicked
    console.log('Item clicked:', item);
    setsousPath(item);
    setsousBilan(false);
    setsympAffiche(true);
  };


  const handleListItemClickBis = (item: Symptome) => {
    // Implement your logic here when an item is clicked
    console.log('Item clicked:', item);
    setSymp(item);
    setsympAffiche(false);
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        {yes ? (
          // Show the list of user.my_personal_data
          <View style={styles.popV}>
            <ScrollView style={styles.scrollContainer}>
              {pathologieJSON.filter(pathologie => pathologie.id >= '36').map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleListItemClick(item)}
                  style={styles.listItem}
                >
                  <AppText text={item.id.toString() + " - " + item.name} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose()}} />
          </View>
        ) : (
          sousBilan ?
            <View style={styles.popV}>
              <ScrollView style={styles.scrollContainer}>
                {path ? path.symptoms.map((item) =>
                  <TouchableOpacity
                    key={pathologieJSON.filter(p => p.id == item.id.toString())[0].id}
                    onPress={() => handleListItemClickSousBilan(pathologieJSON.filter(p => p.id == item.id.toString())[0])}
                    style={styles.listItem}
                  >
                    <AppText text={pathologieJSON.filter(p => p.id == item.id.toString())[0].id.toString() + " - " + pathologieJSON.filter(p => p.id == item.id.toString())[0].name} />
                  </TouchableOpacity>
                ) : null}
              </ScrollView>
              <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose()}} />
            </View>
            :
              sympAffiche ?
                <View style={styles.popV}>
                <ScrollView style={styles.scrollContainer}>
                  {souspath ? souspath.symptoms.map((item) =>
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleListItemClickBis(item)}
                      style={styles.listItem}
                    >
                      <AppText text={item.id.toString() + " - " + item.name} />
                    </TouchableOpacity>
                  ) : null}
                  </ScrollView>
                  <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose()}} />
                </View>
              :
                // Show the text and back button when the item is clicked
                <View style={styles.popV}>
                  {symp ? <InputSymptome s={symp} onClose={onClose} onArrow={() => { setYes(true); setsousBilan(true); }} /> : null}
                  <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose()}} />
                </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popV: {
    height: height, // Use the full height of the screen
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    margin: '15%',
    flex: 1,
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0, // Align at the top
    left: 0, // Align at the left
    paddingVertical: 8,
  },
});

export default BilanAddPopUp;
