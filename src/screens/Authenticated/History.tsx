import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import HistoryTimeline from '@components/molecules/HistoryTimeline';
import HistoryCharts from '@components/molecules/HistoryCharts';
import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import Subtitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import AppText from '@components/atoms/AppText';

import { BottomTabParamList } from '@navigation/types';
import { useReportsStore } from '@store/store';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import fonts from '@styles/fonts';
import colors from '@styles/colors';
import { MALADIE1 } from '@constants/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import BoxHistorique from '@components/atoms/BoxHistorique';
import { Ionicons } from '@expo/vector-icons';
import BoxSymptome from '@components/atoms/BoxSymptome';
import ChartSymptome from '@components/atoms/ChartSymptome';
import { Symptome, Pathologie, Data } from '@store/types';

type Props = {
  navigation: StackNavigationProp<BottomTabParamList, 'History'>;
};



const ExempleData : Data[] = [
  {date:'08/06/2023', valeur: 12},
  {date:'01/06/2023', valeur: 32},
  {date:'25/05/2023', valeur: 20},
]

const exempleSymList : Symptome[]=[
  {id: 1, name: "Poids",frequence:"tous les 7 jours",data:ExempleData,type:"kg"},
  {id: 2, name: "Douleur",frequence:"Tous les jours",data:ExempleData,type:"kg"},
]

const exempleList: Pathologie[] = [
  { id:"1",name: 'Articulaire',date:"15/01/2023", more:"Coude - Gauche",namelogo:"picture",symptoms:exempleSymList },
  { id:"2",name: 'Artie',date:"15/01/2023", more:"Coude - Gauche",namelogo:"picture",symptoms:exempleSymList  },
  { id:"3",name: 'Articaire',date:"15/01/2023", more:"Coude - Gau",namelogo:"picture",symptoms:exempleSymList  },
  ]

  



const History = ({ navigation }: Props): ReactElement => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [graph, graphClicked] = React.useState(false);
  

  const onPressPath = (index : number): void =>{
    setIsClicked(true);
    setCurrentIndex(index);
  }
  const prev = ():void =>{
    setIsClicked(false);
    graphClicked(false);
  }

  const graphpress = ():void =>{
    graphClicked(!graph);
  }

  return ( 
    
    <Container>
       
       {isClicked ?
        <>
          <Ionicons
            name="ios-arrow-round-back"
            size={layout.navigation.previousIcon.size}
            color={colors.black}
            onPress={prev}
          />
          <View style= {styles.container}> 
            {exempleList[currentIndex].namelogo ? <AntDesign name={exempleList[currentIndex].namelogo} size={50} color="black" /> : null}
            <View style = {styles.content}>
              <AppText text={exempleList[currentIndex].name} style={styles.title} />
              {exempleList[currentIndex].more ? <AppText text={exempleList[currentIndex].more} style={styles.subtitle} /> : null}
              <AppText text= {"Depuis le " + exempleList[currentIndex].date} style={styles.text} />
            </View>
          </View>
          <View style= {styles.buttonsContainer}>
            <Button style={styles.button} text={"Données"} onPress={graphpress} isSelected={graph ? false : true} />
            <Button style={styles.button} text={"Graph"} onPress={graphpress} isSelected ={graph ? true : false}/> 
          </View>
          {graph ? 
            (  
              <>
            <AppText text={"GRAPH"} style={styles.pagetitle} /> 
            <ChartSymptome objet = {exempleList[currentIndex].symptoms[0]}/>
              </>
            )
            :
            <>
            {
              exempleList[currentIndex].symptoms.map((object, index) => {    
                return (<BoxSymptome key={index} objet={object}/>);      
              })
            }
            </>
            
          }
        </>
      : 
        <> 
        <AppText text={"Historique"} style={styles.pagetitle} />   
        {
          exempleList.map((object, index) => {    
            return (<BoxHistorique onPress={() => onPressPath(index)} key={index} objet={object}/>);      
          })
        }  
        </>
      }
    
      
    </Container>
  );
};

export default History;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    marginBottom: 2,
    
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  content:{
    //textAlign: 'right',
    marginLeft:20,
    //justifyContent: 'center',

  },
  pagetitle :{
    fontSize: 28,
    marginBottom: 20,
    marginLeft: 5,
    marginTop:5,
  },
  container: {
    padding: 10,
    marginBottom: 10,
    flexDirection:'row',
    alignItems:'center',
    //flex: 1,
    //paddingTop: layout.padding,
  },
  // subtitle: {
  //   marginTop: layout.padding,
  //   textAlign: 'center',
  // },
  buttonsContainer: {
    flexDirection: 'row',
    
  },
  button: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
    alignItems: 'center',
  },
  buttonList: {
    borderTopLeftRadius: layout.buttons.borderRadius,
    borderBottomLeftRadius: layout.buttons.borderRadius,
  },
  buttonCharts: {
    borderTopRightRadius: layout.buttons.borderRadius,
    borderBottomRightRadius: layout.buttons.borderRadius,
  },
  textButtons: {
    textAlign: 'center',
    fontFamily: fonts.label.fontFamily,
    fontSize: fonts.label.fontSize,
    marginTop: 4,
  },
});
