import React, { ReactElement } from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Button from '@components/atoms/Button';
import { he } from 'date-fns/locale';
import layout from '@styles/layout';
type Props = {}

const data = [
    { id: 1, title: 'Articulation', subtitle: 'Coude-Gauche' },
    // Add more data items as needed
  ];
  const symptomsData = [
    { id: 1, title: 'Articulation', subtitle: 'Coude-Gauche' },
    { id: 2, title: 'Articulation', subtitle: 'Coude-Gauche' },
    // Add more symptom items as needed
  ];
  
  type CustomComponentProps = {
    title: string;
    subtitle: string;
  };
  
  const CustomComponent = ({ title, subtitle }: CustomComponentProps) => (
    <View style={styles.customComponentContainer}>
      <View style={styles.circle} />
      <View style={styles.textContainer}>
        <Text style={styles.title_custom}>{title}</Text>
        <Text style={styles.subtitle_custom}>{subtitle}</Text>
      </View>
      <Button
  text="+"
  onPress={()=>{}}
  style={styles.addButton}

  
  
/>
    </View>
  );
  type Item = {
    id: number;
    title: string;
    subtitle: string;
  };
  const renderItem = ({ item }: { item: Item }) => (
    <View>
    <View style={styles.itemContainer}>
      <AntDesign name="forward" size={24} color="#ffc000" style={styles.icon}/>
      <View style={styles.textContainer}>
        <Text style={styles.title_comp}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
    {symptomsData.map((item) => (
      <CustomComponent key={item.id} title={item.title} subtitle={item.subtitle} />
    ))}
    </View>
  );

function HistoryFollowedSymptoms({}: Props) {
  return (
    <View style={styles.container}>
        <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.flatListContainer}
    />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1
      
      
    },
    flatListContainer: {
        flexGrow: 1,

      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'gray',
      textAlign: 'center', // Specify the desired color here
      marginBottom: '60%'
    },
    title_custom: {
        fontSize: 18,
      fontWeight: 'bold',
      color: 'gray',
      textAlign: 'center',
      marginRight: 20
    },
    redText: {
        color: 'red'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent:  'space-between',
        
      },
      icon: {
        marginRight: 30,
      },
      textContainer: {
        flexDirection: 'column',
      },
      title_comp: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      subtitle: {
        fontSize: 14,
      },
      subtitle_custom: {
        fontSize: 10,
      },
      
  customComponentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#92c026',
    marginRight: 20,
  },
  addButton: {
    marginLeft: 'auto',
    paddingHorizontal: layout.padding/2,
    paddingVertical: layout.padding / 4,

  },
  });
export default HistoryFollowedSymptoms