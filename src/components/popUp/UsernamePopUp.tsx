import AppText from '@components/atoms/AppText';
import Button from '@components/atoms/Button';
import { InformationContext } from '@components/molecules/InformationContext';
import { InformationContext2 } from '@components/molecules/InformationContext2';
import { getIconPath } from '@constants/constants';
import { useFocusEffect } from '@react-navigation/native';
import { useUsersStore } from '@store/store';
import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Dimensions,Image } from 'react-native';

interface PopupProps {
    isVisible: boolean;
    onClose: () => void;
  }
  
  const UsernamePopUp: React.FC<PopupProps> = ({ isVisible, onClose }) => {
    const screenHeight = Dimensions.get('window').height;
    const popupHeight = screenHeight * 0.8;
    const [users, actions_users] = useUsersStore();
  
    const handleOverlayPress = () => {
      onClose(); // Close the popup when the overlay is pressed
    };
  
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
            {users.map((u, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  actions_users.switchUser(index);
                  onClose(); // Close the popup when a user is selected
                }}
              >
                <AppText text={u.username} style={{ fontSize: 24 }} />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default UsernamePopUp;
