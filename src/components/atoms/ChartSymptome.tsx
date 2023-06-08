import { Symptome } from '@store/types';
import React, { ReactElement } from 'react';
import { LineChart, YAxis, XAxis, Grid  } from 'react-native-svg-charts';
import { View, Dimensions } from 'react-native';


type Props = {
    objet:Symptome;
  };


  const ChartSymptome = ({ objet }: Props): ReactElement => {
    
      const labels = objet.data ? objet.data.map(item => item.date) : null;
      const values = objet.data ? objet.data.map(item => item.valeur) : null;
      return (
        <View style={{ marginRight:20,marginLeft:20,height:150, flexDirection: 'row'}}>
          <YAxis
            data={values}
            contentInset={{ top: 2, bottom: 2 }}
            svg={{ fontSize: 10, fill: 'grey' }}
            numberOfTicks={10}
            formatLabel={value => `${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={values}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={{ top: 2, bottom: 2 }}
               // Ajustez la valeur du curveFactor selon vos besoins (0.5 pour une courbe plus arrondie)
              //showPoints={true}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={values}
              formatLabel={(value, index) => labels[index]}
              contentInset={{ left: 2, right: 2 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      );


  }


  export default ChartSymptome;