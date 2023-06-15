import React, { ReactElement, useEffect, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
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
  {date:'08/05/2023', valeur: 12},
  {date:'15/05/2023', valeur: 32},
  {date:'25/05/2023', valeur: 20},
  {date:'01/06/2023', valeur: 12},
  {date:'12/06/2023', valeur: 32},
  {date:'25/06/2023', valeur: 20},
]

const ExempleData2 : Data[] = [
  {date:'08/05/2023', valeur: 5},
  {date:'15/05/2023', valeur: 6},
  {date:'25/05/2023', valeur: 9},
  {date:'01/06/2023', valeur: 5},
  {date:'12/06/2023', valeur: 4},
  {date:'25/06/2023', valeur: 1},
]

const exempleSymList : Symptome[]=[
  {id: 1, name: "Poids",frequence:"tous les 7 jours",data:ExempleData,type:"kg"},
  {id: 2, name: "Douleur",frequence:"Tous les jours",data:ExempleData2,type:"num"},
  {id: 2, name: "Température",frequence:"Tous les jours",type:"num"},
]

const exempleList: Pathologie[] = [
  { id:"1",name: 'Articulaire',date:"15/01/2023", more:"Coude - Gauche",namelogo:'3_i.png',symptoms:exempleSymList },
  { id:"2",name: 'Artie',date:"15/01/2023", more:"Coude - Gauche",namelogo:"6_i.png",symptoms:exempleSymList  },
  { id:"3",name: 'Articaire',date:"15/01/2023", more:"Coude - Gau",namelogo:"4_i.png",symptoms:exempleSymList, dateend:"15/02/2023" },
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
            {exempleList[currentIndex].namelogo ? <Image style={{ width: 40, height: 40 }} source={getIconPath(exempleList[currentIndex].namelogo)} /> : null}
            <View style = {styles.content}>
              <AppText text={exempleList[currentIndex].name} style={styles.title} />
              {exempleList[currentIndex].more ? <AppText text={exempleList[currentIndex].more} style={styles.subtitle} /> : null}
              {exempleList[currentIndex].dateend ? 
                <AppText text= {"Du " + exempleList[currentIndex].date + " Au " + exempleList[currentIndex].dateend} style={styles.text} />
                :
                <AppText text= {"Depuis le " + exempleList[currentIndex].date} style={styles.text} />
              }
            </View>
          </View>
          <View style= {styles.buttonsContainer}>
            <Button style={styles.button} text={"Données"} onPress={graphpress} isSelected={graph ? false : true} />
            <Button style={styles.button} text={"Graphique"} onPress={graphpress} isSelected ={graph ? true : false}/> 
          </View>
          {graph ? 
            (  
              <>
            {
            exempleList[currentIndex].symptoms.map((object, index) => {    
                return (
                  <>
                 {object.data ?
                  <View key= {index}>
                  <AppText  text={object.name} style={styles.pagetitle} />
                  {object.data ? <ChartSymptome  objet = {object}/> : null}
                  </View>
                  :
                  null
                  }
                  </>
             
                );      
              }) 
            }
            
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
