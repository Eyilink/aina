import { Symptome } from '@store/types';
import React, { ReactElement } from 'react';
import { LineChart, YAxis, XAxis, Grid  } from 'react-native-svg-charts';
import { View, Dimensions } from 'react-native';


type Props = {
    objet:Symptome;
  };


  const ChartSymptome = ({ objet }: Props): ReactElement => {
    
      const labels = objet.data.map(item => item.date);
      const values = objet.data.map(item => item.valeur);
      return (
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={values}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
            numberOfTicks={10}
            formatLabel={value => `${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={values}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={{ top: 20, bottom: 20 }}
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