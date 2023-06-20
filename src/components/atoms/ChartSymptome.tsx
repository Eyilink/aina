import { Symptome, Data } from '@store/types';
import React, { ReactElement } from 'react';
import { LineChart, YAxis, XAxis, Grid  } from 'react-native-svg-charts';
import { View, Dimensions } from 'react-native';
import { Line } from 'react-native-svg';
import * as shape from 'd3-shape';
import { Circle } from 'react-native-svg';
import colors from '@styles/colors';



type Props = {
    objet:Symptome;
  };



  const ChartSymptome = ({ objet }: Props): ReactElement => {
    
    const labels: string[] = objet.data ? objet.data.map(item => {
      const dateParts = item.date.split('/');
      return `${dateParts[0]}/${dateParts[1]}`;
    }) : [''];
      const values = objet.data ? objet.data.map(item => item.valeur) : [0];


      console.log(labels[0]);
      return (

        <View style={{ marginRight:20,marginLeft:20,height:150, flexDirection: 'row'}}>
        <YAxis
          data={values}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'black' }}
          numberOfTicks={7}
          formatLabel={value => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={values}
            svg={{ stroke: colors.primary }}
            contentInset={{ top: 20, bottom: 20 }}
            //showGrid={false} // Suppression de la grille pour éviter de superposer les points
            curve={shape.curveNatural} // Utilisation de la courbe arrondie (curveNatural)
          >
          
       {/* {values.map((value, index) => (
        <Circle
          key={index}
          cx={index * 66} // Coordonnée x du point
          cy={value} // Coordonnée y du point
          r={4} // Rayon des points
          stroke={'grey'}
          fill={'white'}
        />
      ))}  */}

            
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10 }}
            data={values}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </View>
      );


  }


  export default ChartSymptome;