import Button from '@components/atoms/Button';
import { InformationContext } from '@components/molecules/InformationContext';
import { InformationContext2 } from '@components/molecules/InformationContext2';
import { getIconPath } from '@constants/constants';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Dimensions,Image } from 'react-native';

interface PopupProps {
  isVisible: boolean;
  isPopUpone: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isVisible,isPopUpone, onClose }) => {
  const screenHeight = Dimensions.get('window').height;
  const popupHeight = screenHeight * 0.8;
  const {infoText,setinfoText} = useContext(InformationContext);
  const {infoText2,setinfoText2} = useContext(InformationContext2);

  // useFocusEffect(()=>{
  // //   if(isPopUpone)
  // //   setImS(infoText);
  // // else
  // //   setImS(infoText2);
  // // console.log(imS)

  // });
 

 
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
           {isPopUpone ?  (infoText && infoText != '' ? <Image
              source={getIconPath(infoText)}
              style={{
                width: '100%',
                height: '80%',
                // borderWidth: 2,
                // borderColor: 'salmon',
                resizeMode: 'contain', // Use the desired resizeMode value here
              }}
            /> : null ) : (infoText2 && infoText2 != '' ? <Image
            source={getIconPath(infoText2)}
            style={{
              width: '100%',
              height: '80%',
              // borderWidth: 2,
              // borderColor: 'salmon',
              resizeMode: 'contain', // Use the desired resizeMode value here
            }}
          /> : null )}

          <Button text={'FERMER'} isSelected onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
