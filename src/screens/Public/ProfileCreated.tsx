import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


import Container from '@components/molecules/Container';
import Button from '@components/atoms/Button';

import { AuthenticatedStackParamList, BottomTabParamList, PublicStackParamList } from '@navigation/types';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { useAuthStore } from '@store/store';
import NewSuivi from '@components/molecules/NewSuivi';

import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import Previous from '@components/atoms/Previous';
import { BooleanContext } from '@components/molecules/BooleanContext';
import { InformationContext } from '@components/molecules/InformationContext';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'ProfileCreated'>;
};
const ProfilCreated = ({navigation}:Props): ReactElement => {
  const [ButtonValidateClicked, setButtonValidateClicked] = React.useState(false);
  const [isPathAdded,setIsPathAdded] = useState<boolean>(true);
  const [,actions]=useAuthStore();

 
  const ValidatePressed = (): void => {
    // setButtonValidateClicked(true);
   actions.editUserProfile({key: 'boolC',value: true});
   actions.editUserProfile({key: 'boolF',value: true});
    actions.signupUser();
    
  };

  const ValidateButtonNewSuiviPressed = (): void => {
    setButtonValidateClicked(!ButtonValidateClicked);
  };

  const onNoValidate = (): void => {
    actions.editUserProfile({key: 'boolC',value: false});
    actions.editUserProfile({key: 'boolF',value: true});
    actions.signupUser();
  };
  useEffect(()=>{
    console.log("path added true or false :"+isPathAdded);
    if(!isPathAdded)
    {actions.saveUserProfile();
      actions.signupUser();}
      
  },[isPathAdded])

  return (
    <Container>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {`${i18n.t('signup.endsignup')} `}
          </Text>
        </View>
        {ButtonValidateClicked?<><View style={styles.container}>
          <Ionicons
            name="ios-arrow-round-back"
            size={layout.navigation.previousIcon.size}
            color={colors.black}
            onPress={ValidateButtonNewSuiviPressed}
          />
          <NewSuivi  setButtonNewSuiviClicked={setIsPathAdded} /></View></>: 
          <>
            
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                {`${i18n.t('profile.newfollow')} `}
              </Text>
            </View>

            <Button style={styles.button}
              text={i18n.t('commons.yes')}
              onPress={ValidatePressed}
              isSelected
            />
            <Button style={styles.button}
              text={i18n.t  ('commons.no')}
              onPress={onNoValidate}
            />
          </>
        }
        
    </Container>
  );
};

export default ProfilCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 50
  },
  message: {
    textAlign: 'center',
    fontFamily: fonts.subtitle.fontFamily,
    fontSize: fonts.subtitle.fontSize,
    lineHeight: fonts.subtitle.fontSize,
  },
  cta: {
    textDecorationLine: 'underline',
    fontFamily: fonts.weight.bold.fontFamily,
  },
  button: {
    marginTop : 75,
  }
});
