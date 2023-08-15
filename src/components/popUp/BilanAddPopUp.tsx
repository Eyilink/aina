import Button from '@components/atoms/Button';
import { Evaluateurs, MALADIE1, pathologieJSON } from '@constants/constants';
import { useUserStore } from '@store/store';
import { Pathologie, Symptome } from '@store/types';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import InputSymptome, { InputBox } from '@components/molecules/AskSymptoms';
import { Path } from 'react-native-svg-charts';
import json_p from '@assets/json/pathologies.json'
import json_s from '@assets/json/symptomes.json'
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import Clinimeter from '@components/molecules/Clinimeter';
import Title from '@components/atoms/Title';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};
const { height, width } = Dimensions.get('window');

const BilanAddPopUp: React.FC<Props> = ({ isVisible, onClose }) => {
  const [evaluateur, setEvaluateur] = useState(true);
  const [yes, setYes] = useState(true);
  const [sousBilan, setsousBilan] = useState(true);
  const [user,] = useUserStore({ disease: MALADIE1 });
  const [path, setPath] = useState<Pathologie>();
  const [evaluat, setEvaluat] = useState<String>();
  const [souspath, setsousPath] = useState<Pathologie>();
  const [symp, setSymp] = useState<Symptome>();
  const [currS, setCurrS] = useState<Symptome>();

  const addValueUser = (sympt: Symptome, val: number | string) => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    // Iterate over each pathology in my_personal_datas
    user.my_personal_datas.forEach((pathology) => {
      // Find the symptoms with the same id as the provided sympt
      const symptomsToUpdate = pathology.symptoms.filter((symptom) => symptom.id === sympt.id);

      // Update the data field of each matching symptom

      if (symptomsToUpdate[0]) {

        const newData = { date: formattedDate, valeur: val };

        if (!symptomsToUpdate[0].data) {
          // If data field doesn't exist, create a new array with the new data
          symptomsToUpdate[0].data = [newData];
        } else {
          // If data field already exists, concatenate the new data to the existing array
          symptomsToUpdate[0].data = symptomsToUpdate[0].data.concat(newData);
        }
      }

      console.log(pathology.symptoms);
    });
  };

  const Init = () => {
    setEvaluateur(true);
    setYes(true);
    setsousBilan(true);
  }

  const handleListEvaluateurClick = (item: String) => {
    // Implement your logic here when an item is clicked
    console.log('Evaluateur clicked:', item);
    setEvaluat(item);
    setEvaluateur(false);
    console.log(evaluat);
  };
  const handleListItemClick = (item: Pathologie) => {
    // Implement your logic here when an item is clicked
    console.log('Bilan clicked:', item);
    setPath(item);
    setYes(false);
    console.log(path);
  };
  const handleSliderChange = (value: number) => {

    if (currS)
      addValueUser(currS, value);
  };
  const handleSympChange = (value: Symptome) => {
    setCurrS(value);
  };
  const handleTxtChange = (value: string) => {

    if (currS)
      addValueUser(currS, value);
  };

  const handleYesNoChange = (value: boolean) => {

    if (currS)
      addValueUser(currS, value ? 1 : 0);

  };

  const handleListItemClickSousBilan = (item: Pathologie) => {
    // Implement your logic here when an item is clicked
    console.log('Sous bilan clicked:', item);
    setsousPath(item);
    setsousBilan(false);
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        {evaluateur ? (
          <View style={styles.popV}>
            <ScrollView style={styles.scrollContainer}>
              <Title text={'Qui fait le bilan ?'}/>
              {Evaluateurs.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleListEvaluateurClick(item)}
                  style={styles.listItem}
                >
                  <AppText text={index.toString() + " - " + item} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose() }} />
          </View>) :

          (yes ? (
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
              <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose() }} />
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
                <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose() }} />
              </View>
              :
              <>
                <View style={styles.popV}>
                  <ScrollView style={styles.scrollContainer}>
                    {souspath && !souspath.name.includes("Clinim") ? souspath.symptoms.map((item) =>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', paddingTop: 20 }}>
                        <AppText style={{ textAlign: 'center' }} text={item.surname ? item.surname.toString() : item.name} />
                        <InputBox s={item} evaluateur={evaluat?evaluat.toString():undefined} onClose={() => { }} noText recupSliderValue={handleSliderChange} recupYesNo={handleYesNoChange} recupText={handleTxtChange} recupSymp={handleSympChange} donotdispVButtons ouinonSameLine />
                      </View>
                    ) : <Clinimeter pathos={souspath}/>}
                  </ScrollView>
                  <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose() }} />
                </View>
              </>
          ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popV: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',


  },
  scrollContainer: {
    width: '100%',
    // margin: '15%',
    flex: 1,
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%'
  },
  closeButton: {
    alignItems: 'center',

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
