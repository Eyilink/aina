import { Pathologie, Symptome } from '@store/types';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import { InputBox } from './AskSymptoms';
import { useUserStore } from '@store/store';
import { MALADIE1 } from '@constants/constants';
import { useFocusEffect } from '@react-navigation/native';

interface Props{
    pathos?: Pathologie;
    isMIF?: boolean;
}
const Clinimeter = ({pathos,isMIF}:Props) => {
  const [sliderValue,setSliderValue] = useState<number>(0);
  const [currSymptom,setCurrSymptom] = useState<Symptome | undefined> (pathos?.symptoms[0] ? pathos.symptoms[0] : undefined);
  const [intensiteSymptom,setIntensiteSymptom] = useState<string>("Pas encore d'intensite");
  var value = 0;

  const [user,actions ] = useUserStore({ disease: MALADIE1 });
  const circles = [];
  const lines = [];
  const label: JSX.Element[] = [];
  const points: JSX.Element[] = [];
  useEffect(() => {
    if (pathos) {
      pathos.symptoms.forEach((s, ind) => {
        addValueUser(s, 0);
      });
    }
  }, []); 

if(isMIF)
  for (let i = 0; i < 7; i++) {
    const radius = (10 - i) * 9; // Vary the radius from 100% to 0% in increments of 10%
    const bRadius = 300*(i+1);
    circles.push(
      <View key={i} style={[styles.circle, { width: `${radius}%`, height: `${radius}%`,borderRadius: bRadius }]} />
    );
  }
else
for (let i = 0; i < 10; i++) {
  const radius = (10 - i) * 9; // Vary the radius from 100% to 0% in increments of 10%
  const bRadius = 300*(i+1);
  circles.push(
    <View key={i} style={[styles.circle, { width: `${radius}%`, height: `${radius}%`,borderRadius: bRadius }]} />
  );
};
  if(pathos)
  for (let i = 0 ; i < pathos.symptoms.length/2 ; i++)
  {
    const rotateDegree = (360/pathos.symptoms.length) * i;
    lines.push(
        <View style={[styles.lineHorizontal, { transform: [{ rotate: `${rotateDegree}deg` }] },]} />
    );

  }
  const L: { translateX: number; translateY: number }[] = [];
  if(pathos)
  pathos.symptoms.map((s,ind)=>{
    const rotateDegree = (360/pathos.symptoms.length) * ind ;
    const translateX = Math.cos((rotateDegree - 80) * (Math.PI / 180)) * 190;
    const translateY = Math.sin((rotateDegree - 80) * (Math.PI / 180)) * 190;
    
    L.push({translateX,translateY});
    label.push(
        <View
          key={ind}
          style={[
            styles.label,
            {
              transform: [
                { translateX: translateX },
                { translateY: translateY },
                { rotate: `${rotateDegree}deg` },
              ],
            },
          ]}
        >
          <Text style={{fontSize: currSymptom?.surname == s.surname ? 9 :  7, fontWeight: currSymptom?.surname == s.surname ? 'bold' : 'normal', transform: [{ rotate: `10deg` }], }}>{s.surname ? s.surname : s.name}</Text>
        </View>
      );
  })



  const Line = ({ startX , startY, endX, endY } : LineProps) => {
    const angle = Math.atan2(endY - startY, endX - startX);
    const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  
    return (
      <View
        style={[
          styles.line,
          {
            transform: [
              { translateX: startX },
              { translateY: startY },
              { rotate: `${angle}rad` },
            ],
            width: length,
          },
        ]}
      />
    );
  };

  
  // L.forEach((point, index) => {
  //   if (index < L.length - 1) {
  //     const nextPoint = L[index + 1];
  //     lines.push(
  //       <Line
  //         key={index}
  //         startX={point.translateX}
  //         startY={point.translateY}
  //         endX={nextPoint.translateX}
  //         endY={nextPoint.translateY}
  //       />
  //     );
  //   }
  // });

  
  if (pathos) {
    pathos.symptoms.forEach((s, ind) => {
      // if(currSymptom?.id == s.id)
      // {
      
      
   value = 0;
   
  const foundSymptome = user.my_personal_datas.find(p => p.id === '21')?.symptoms.find(sp => sp.id === s.id);
  if (foundSymptome) {
    if (Array.isArray(foundSymptome.data) && foundSymptome.data.length > 0) {
      const lastValue = foundSymptome.data[foundSymptome.data.length - 1].valeur;
      const numericLastValue = typeof lastValue === 'number' ? lastValue : 0;
      
      value = numericLastValue;
    }
  }
  // setSliderValue(value);

console.log("clinimeter value ::: " + (foundSymptome ? foundSymptome.name : "") + " ::: value ::: " + value);


      
      const randomInt = Math.floor(Math.random() * 177);
      const rotateDegree = (360 / pathos.symptoms.length) * ind;
      
      if(isMIF)
      {
        
        const translateX = Math.cos((rotateDegree - 80) * (Math.PI / 180)) * (176/10) * (value > 0 ? value+3 : value) ;
      const translateY = Math.sin((rotateDegree - 80) * (Math.PI / 180)) * (176/10) * (value > 0 ? value+3 : value) ;
        points.push(
          <View
            key={`point-${ind}`}
            style={{
              position: 'absolute',
              backgroundColor: 'red', // Customize point style
              width: 7,
              height: 7,
              borderRadius: 2.5,
              transform: [
                { translateX: translateX  },
                { translateY: translateY  },
              ],
            }}
          />
        );

      }else
      {
      const translateX = Math.cos((rotateDegree - 80) * (Math.PI / 180)) * (176/10) * value;
      const translateY = Math.sin((rotateDegree - 80) * (Math.PI / 180)) * (176/10) * value;
      // if(isMIF)
      // {
      //   translateX = translateX + Math.cos((rotateDegree - 80) * (Math.PI / 180)) * (176/10) * 90;
      //   translateY = translateY+ Math.sin((rotateDegree - 80) * (Math.PI / 180)) * (176/10) * 90;

      // }
      points.push(
        <View
          key={`point-${ind}`}
          style={{
            position: 'absolute',
            backgroundColor: 'red', // Customize point style
            width: 7,
            height: 7,
            borderRadius: 2.5,
            transform: [
              { translateX: translateX  },
              { translateY: translateY  },
            ],
          }}
        />
      );
        }
  
      // if (ind >= 0) {
      //   const prevRotateDegree = (360 / pathos.symptoms.length) * (ind - 1);
      //   const prevTranslateX = Math.cos((prevRotateDegree - 80) * (Math.PI / 180)) *(176/10) * value;
      //   const prevTranslateY = Math.sin((prevRotateDegree - 80) * (Math.PI / 180)) * (176/10) * value;
  
      //   const angle = Math.atan2(translateY - prevTranslateY, translateX - prevTranslateX) - 0.15;
      //   const distance = Math.sqrt((translateX - prevTranslateX) ** 2 + (translateY - prevTranslateY) ** 2) + 3;
  
        // lines.push(
        //   <View
        //     key={`line-${ind}`}
        //     style={{
        //       position: 'absolute',
        //       backgroundColor: 'red', // Customize line style
        //       width: distance,
        //       height: 1,
        //       transform: [
        //         { translateX: prevTranslateX },
        //         { translateY: prevTranslateY },
        //         { rotate: `${angle}rad` },
        //       ],
        //     }}
        //   />
        // );
      // }
    }
    );
  }
  interface LineProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }
  
  

  const switchToNextSymptom = () => {
    console.log("Switch to next !");
    if (!currSymptom || !pathos || !pathos.symptoms) {
        return;
      }

    const currentSymptomIndex = pathos?.symptoms.findIndex(symptom => symptom.id === currSymptom.id);
    if (currentSymptomIndex !== -1) {
      const nextSymptomIndex = (currentSymptomIndex + 1) % pathos?.symptoms.length;
      setCurrSymptom(pathos.symptoms[nextSymptomIndex]);
    }
   
  };
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
  useEffect( () => {
    if(!isMIF)
    switch(sliderValue)
    {
    case 0:
      setIntensiteSymptom("Non évaluée");
      break;
    case 1:
        setIntensiteSymptom("Aide totale lourde");
        break;
    case 2:
        setIntensiteSymptom("Aide totale");
        break;
    case 3:
        setIntensiteSymptom("Aide maximale");
        break;
    case 4:
        setIntensiteSymptom("Aide moyenne");
        break;
    case 5:
        setIntensiteSymptom("Aide minimale");
        break;
    case 6:
        setIntensiteSymptom("Surveillance");
        break;
    case 7:
        setIntensiteSymptom("Indépendance modifiée");
        break;
    case 8:
        setIntensiteSymptom("Incidents en hausse");
        break;
    case 9:
        setIntensiteSymptom("Incidents");
        break;
    case 10:
        setIntensiteSymptom("Indépendance complète");
        break;
    default:
        setIntensiteSymptom("Erreur intesité");
      break;
    }
    else
    switch(sliderValue)
    {
    case 0:
      setIntensiteSymptom("Non évaluée");
      break;
    case 1:
        setIntensiteSymptom("Aide totale");
        break;
    case 2:
      setIntensiteSymptom("Aide maximale");
        break;
    case 3:
      setIntensiteSymptom("Aide moyenne");
        break;
    case 4:
      setIntensiteSymptom("Aide minimale");
        break;
    case 5:
      setIntensiteSymptom("Surveillance");
        break;
    case 6:
      setIntensiteSymptom("Indépendance modifiée");
        break;
    case 7:
        setIntensiteSymptom("Indépendance complète");
        break;
    default:
        setIntensiteSymptom("Erreur intesité");
      break;
    }

  },[sliderValue])
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    
    if(currSymptom)
    {
      addValueUser(currSymptom,value);
      actions.saveUserProfile();
    }
  };
  const switchToPreviousSymptom = () => {
    console.log("Switch to previous !");
    if (!currSymptom || !pathos || !pathos.symptoms) {
        return;
      }
  
    const currentSymptomIndex = pathos?.symptoms.findIndex(symptom => symptom.id === currSymptom.id);
    
    if ( currentSymptomIndex !== -1) {
      const previousSymptomIndex = (currentSymptomIndex - 1 + pathos.symptoms.length) % pathos.symptoms.length;
      setCurrSymptom(pathos.symptoms[previousSymptomIndex]);
    }
  };
  return <View style={{flex:1, paddingTop: 20}}>
            <View>
                <View style={{flexDirection: 'row',alignSelf: 'center',alignItems: 'center', marginBottom: 40}}>
                    <TouchableOpacity onPress={switchToPreviousSymptom} style={{}}>
                    <AntDesign name="caretleft" size={48} color="black" />
                    </TouchableOpacity>
                    <AppText text={currSymptom?.surname ? currSymptom.surname : ''} />
                    <TouchableOpacity onPress={()=>{switchToNextSymptom()}} style={{}}>
                    <AntDesign name="caretright" size={48} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <AppText text={intensiteSymptom} />
                    {currSymptom ? <View style={{width: '100%'}}><InputBox s={currSymptom} onClose={()=>{}} noText isMIF={isMIF} recupSliderValue={handleSliderChange}   donotdispVButtons initsetSliderValue={sliderValue}/></View> : null}
                </View>
            </View>
            <View style={styles.container}>{circles}{lines}{label}{points}</View>
        </View>;
};

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  circle: {
    position: 'absolute',
    
    
    borderWidth: 1,
  },
  lineHorizontal: {
    position: 'absolute',
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
  },
  label: {
    position: 'absolute',
  },
  line: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'black',
  },
});

export default Clinimeter;
