import AppText from '@components/atoms/AppText';
import Button from '@components/atoms/Button';
import { InformationContext } from '@components/molecules/InformationContext';
import { InformationContext2 } from '@components/molecules/InformationContext2';
import { MALADIE1, getIconPath } from '@constants/constants';
import i18n from '@i18n/i18n';
import { useFocusEffect } from '@react-navigation/native';
import { useUserStore, useUsersStore } from '@store/store';
import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Dimensions,Image } from 'react-native';

interface PopupProps {
    isVisible: boolean;
    onClose: () => void;
    onPressEdit?: () => void;
  }
  
  const ChangeProfilePopUp: React.FC<PopupProps> = ({ isVisible, onClose , onPressEdit }) => {
    const screenHeight = Dimensions.get('window').height;
    const popupHeight = screenHeight * 0.8;
    const [users, actions_users] = useUsersStore();
    const [user,actions] = useUserStore({ disease: MALADIE1 });
  
    const handleOverlayPress = () => {
      onClose(); // Close the popup when the overlay is pressed
    };
  const onEditProfile = () => {
    onClose();
    if(onPressEdit)
        onPressEdit();
  }
    return (
      <Modal visible={isVisible} transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          activeOpacity={1} // Prevent the touch from passing through the overlay
          onPress={handleOverlayPress} // Handle overlay press
        >
          <View
            style={{

              width: '50%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center', // Added alignItems to center the content horizontally
            }}
          >
            <Button
      text={i18n.t('profile.creer')}
      onPress={()=>{
        actions_users.replaceUser(user);
        actions_users.saveUsersToAsyncStorage();
        onClose();
        actions.resetUserSession();
      }}
      isValidate

    />
   
    <Button
      text={i18n.t('profile.edit')}
      onPress={onEditProfile}
      isValidate

    />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default ChangeProfilePopUp;
