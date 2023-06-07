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

type Props = {
  navigation: StackNavigationProp<BottomTabParamList, 'History'>;
};


type Symptome = {
  nom: string,
  frequence: string,
  valeur:number,
  unite:string,
}

type Pathologie = {
  nom: string;
  date: string;
  more: string;
  namelogo: string;
  symp: Symptome[];
}

const exempleSymList : Symptome[]=[
  {nom: "Poids",frequence:"tous les 7 jours",valeur:67,unite:"kg"},
  {nom: "Douleur",frequence:"Tous les jours",valeur:8,unite:"/10"},
]

const exempleList: Pathologie[] = [
  { nom: 'Articulaire',date:"15/01/2023", more:"Coude - Gauche",namelogo:"picture",symp:exempleSymList },
  { nom: 'Artie',date:"15/01/2023", more:"Coude - Gauche",namelogo:"picture",symp:exempleSymList  },
  { nom: 'Articaire',date:"15/01/2023", more:"Coude - Gau",namelogo:"picture",symp:exempleSymList  },
  ]

  



const History = ({ navigation }: Props): ReactElement => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [graph, graphClicked] = React.useState(false);
  

  const onPressPath = (index : number): void =>{
    setIsClicked(true);
    setCurrentIndex(index);
    console.log(index);
  }
  const prev = ():void =>{
    setIsClicked(false);
    graphClicked(false);
  }

  const graphpress = ():void =>{
    graphClicked(!graph);

  }
  //console.log(isClicked);

  return ( 
    
    <View>
       
       {isClicked ?
        <>
          <Ionicons
            name="ios-arrow-round-back"
            size={layout.navigation.previousIcon.size}
            color={colors.black}
            onPress={prev}
          />
          <View style= {styles.container}> 
            <AntDesign name={exempleList[currentIndex].namelogo} size={50} color="black" />
            <View style = {styles.content}>
              <AppText text={exempleList[currentIndex].nom} style={styles.title} />
              <AppText text={exempleList[currentIndex].more} style={styles.subtitle} />
              <AppText text= {"Depuis le " + exempleList[currentIndex].date} style={styles.text} />
            </View>
          </View>
          <View style= {styles.buttonsContainer}>
            <Button style={styles.button} text={"Données"} onPress={graphpress} isSelected={graph ? false : true} />
            <Button style={styles.button} text={"Graph"} onPress={graphpress} isSelected ={graph ? true : false}/> 
          </View>
          {graph ? 
            (  <AppText text={"GRAPH"} style={styles.pagetitle} /> )
            :
            <>
            {
              exempleList[currentIndex].symp.map((object, index) => {    
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
    
      
    </View>
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
