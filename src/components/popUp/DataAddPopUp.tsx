import Button from '@components/atoms/Button';
import { MALADIE1 } from '@constants/constants';
import { useUserStore } from '@store/store';
import { Symptome } from '@store/types';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import InputSymptome from '@components/molecules/AskSymptoms';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};
const { height, width } = Dimensions.get('window');

const DataAddPopUp: React.FC<Props> = ({ isVisible, onClose }) => {
    const [yes,setYes] = useState(true);
    const [user, ] = useUserStore({ disease: MALADIE1 });
    const [symp,setSymp] = useState<Symptome | undefined>();

    
  const handleListItemClick = (item: Symptome) => {
    // Implement your logic here when an item is clicked
    console.log('Item clicked:', item);
    setSymp(item);
    setYes(false);
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        {yes ? (
          // Show the list of user.my_personal_data
          <View style={styles.popV}>
            <ScrollView style={styles.scrollContainer}>
              {user.my_personal_datas?.find(p=> p.id == "21")?.symptoms.map((item,index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleListItemClick(item)}
                  style={styles.listItem}
                >
                  <AppText text={item.id.toString() + " - " +item.name} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button text={'Fermer'} isSelected onPress={onClose} />
          </View>
        ) : (
          // Show the text and back button when the item is clicked
          <View style={styles.popV}>
           {symp ? <InputSymptome s={symp} onClose={onClose} onArrow={()=>{setYes(true)}} /> : null }
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popV: {
    height: height*0.8,
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,

            justifyContent: 'center',
            alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 8,
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

export default DataAddPopUp;
