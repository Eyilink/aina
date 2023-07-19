import Button from '@components/atoms/Button';
import React from 'react';
import { View, Modal, Text, TouchableOpacity, Dimensions } from 'react-native';

interface PopupProps {
  isVisible: boolean;
  text: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isVisible, text, onClose }) => {
  const screenHeight = Dimensions.get('window').height;
  const popupHeight = screenHeight * 0.8;

  return (
    <Modal visible={isVisible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            height: popupHeight,
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center', // Added alignItems to center the content horizonta
          }}
        >
          <Text style={{ textAlign: 'center' , height: '80%'}}>{text}</Text>
          <Button text={'FERMER'} isSelected onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
