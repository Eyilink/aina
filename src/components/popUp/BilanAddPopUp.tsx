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
    setYes(false);
    setsousPath(item);
    setsousBilan(false);
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        {evaluateur ? (
          <View style={styles.popV}>
            <Title text={'Qui fait le bilan ?'}/>
            <ScrollView style={styles.scrollContainer}>

              
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
                {pathologieJSON.filter(pathologie => (pathologie.name.includes('Faire un bilan') && pathologie.id >= '100') //|| pathologie.id == '27' || pathologie.id == '28' 
                ).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {if(item.id == '27' || item.id == '28'){ handleListItemClickSousBilan(pathologieJSON.filter(p => p.id == item.id.toString())[0])}else{handleListItemClick(item)}}}
                    style={styles.listItem}
                  >
                    <AppText text={item.title_for_bilan ? item.title_for_bilan : ""} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose() }} />
            </View>
          ) : (
            sousBilan ?
              <View style={{...styles.popV, paddingBottom:30}}>
                <ScrollView>
                  <View style={{paddingTop: 80, paddingBottom: 80}}>
                  {path ? path.init_symptoms?.map((item) =>
                  { if (
                    pathologieJSON.filter(p => p.id == item.id.toString())[0].id >= '100' ||
                    pathologieJSON.filter(p => p.id == item.id.toString())[0].id == '27' ||
                    pathologieJSON.filter(p => p.id == item.id.toString())[0].id == '28'
                  )
                    return <>
                    <TouchableOpacity
                      key={pathologieJSON.filter(p => p.id == item.id.toString())[0].id}
                      onPress={() => handleListItemClickSousBilan(pathologieJSON.filter(p => p.id == item.id.toString())[0])}
                      style={styles.listItem}
                    >
                      <AppText text={pathologieJSON.filter(p => p.id == item.id.toString())[0].id.toString() + " - " + pathologieJSON.filter(p => p.id == item.id.toString())[0].name} />
                    </TouchableOpacity>
                    </>
                  }
                  ) : null}
                  </View>
                </ScrollView>
                <Button text={'Fermer'} isSelected onPress={() => { Init(); onClose() }} />
              </View>
              :
              <>
                <View style={{ padding: 20, display: 'flex',justifyContent: 'center'}}>
                  <ScrollView>
                  <AppText text={souspath?.id.toString() + ' - '+ souspath?.name.toString()} style={{textAlign: 'center',padding: 20, paddingTop: 30, fontSize: 24}}/>
                    {souspath && !souspath.name.includes("Clinim") && !souspath.name.includes("MIF") ? souspath.init_symptoms?.map((item) =>
                      <ScrollView style={{ padding: 20}}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', padding:20}}>
                        <AppText style={{ textAlign: 'center' }} text={item.surname ? item.surname.toString() : item.name} />
                        <InputBox s={item} evaluateur={evaluat?evaluat.toString():undefined} onClose={() => { }} noText recupSliderValue={handleSliderChange} recupYesNo={handleYesNoChange} recupText={handleTxtChange} recupSymp={handleSympChange} donotdispVButtons ouinonSameLine />
                        </View>
                      </ScrollView>
                    ) : ( souspath && souspath.name.includes("Clinim") ? <Clinimeter pathos={souspath}/> : <Clinimeter pathos={souspath} isMIF={true} />)}
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
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  popV: {
    display: 'flex',
    flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
    

  },popV2: {
    display: 'flex',
    flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
    

  },
  

  scrollContainer: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 50
  },
  listItem: {
    justifyContent:'center',
    alignItems: 'center',
    paddingVertical: 20,

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
