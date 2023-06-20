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
import { useReportsStore, useUserStore } from '@store/store';

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
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  const [isPrevious, setPrevious] = React.useState(false);
  const liste : Pathologie[] = isPrevious ? user.my_previous_personal_datas : user.my_personal_datas ;


  const onPressPath = (index : number): void =>{
    setIsClicked(true);
    setCurrentIndex(index);
    setPrevious(false);
    console.log(liste[currentIndex].icon);
    console.log(liste[currentIndex].namelogo);
    console.log(liste[currentIndex].symptoms[0].unit);
  }
  const onPressPathPrev = (index : number): void =>{
    setIsClicked(true);
    setCurrentIndex(index);
    setPrevious(true);
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
  const empty = (): boolean => {
    
    let empt = true;
    liste[currentIndex].symptoms.map((object, index) => {
      
      if (Array.isArray(object.data) && object.data.length > 0){
        empt = false;
      }
     })
     return empt;


  }
  

  
  

  return ( 
    
    <Container>
       <ScrollView>
       {isClicked ?
        <>
          <Ionicons
            name="ios-arrow-round-back"
            size={layout.navigation.previousIcon.size}
            color={colors.black}
            onPress={prev}
          />
          <View style= {styles.container}> 
            {liste[currentIndex].namelogo ? <Image style={{ width: 40, height: 40 }} source={getIconPath(liste[currentIndex].namelogo)} /> : <Image style={{ width: 40, height: 40 }} source={getIconPath("")} />}
            <View style = {styles.content}>
              <AppText text={liste[currentIndex].name} style={styles.title} />
              {liste[currentIndex].more ? <AppText text={liste[currentIndex].more} style={styles.subtitle} /> : null}
              {liste[currentIndex].dateend ? 
                <AppText text= {"Du " + liste[currentIndex].date + " Au " + liste[currentIndex].dateend} style={styles.text} />
                :
                <AppText text= {"Depuis le " + liste[currentIndex].date} style={styles.text} />
              }
            </View>
          </View>
          <View style= {styles.buttonsContainer}>
            <Button style={styles.button} text={"Données"} onPress={graphpress} isSelected={graph ? false : true} />
            <Button style={styles.button} text={"Graphique"} onPress={graphpress} isSelected ={graph ? true : false}/> 
          </View>
          {graph ?
              
            ( 
             !empty() ? 
            (  <>
            {
            liste[currentIndex].symptoms.map((object, index) => {
              let bool : boolean = object.data ? true : false ;   
                return (
                  <>
                 {object.data && object.data.length > 1 ?
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
            <Text style={styles.nodata}>{i18n.t('history.nodata')}</Text>
            )
            :
            <>
            {
              liste[currentIndex].symptoms.map((object, index) => {    
                return (<BoxSymptome key={index} objet={object}/>);      
              })
            }
            </>
            
          }
        </>
      : 
        <> 
        {/* <AppText text={i18n.t('navigation.authenticated.history')} style={styles.pagetitle} />   
        {
          exempleList.map((object, index) => {    
            return (<BoxHistorique onPress={() => onPressPath(index)} key={index} objet={object}/>);      
          })
        }   */}
        <AppText text={i18n.t('navigation.authenticated.history')} style={styles.pagetitle} />   
        {
          user.my_personal_datas?.map((object, index) => {    
            return (<BoxHistorique onPress={() => onPressPath(index)} key={index} objet={object}/>);      
          })
        }  
        <View style={styles.separator} />   
        {
          user.my_previous_personal_datas?.map((object, index) => {    
            return (<BoxHistorique onPress={() => onPressPathPrev(index)} key={index} objet={object}/>);      
          })
        }  
        </>
      }
    
    </ScrollView>
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
  nodata:{
    fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 2,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flex: 1,
  textAlign: 'center',
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
  separator: {
    height: 2,
    backgroundColor: 'black',
    margin: 30, // Ajustez la marge horizontale selon vos besoins
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
