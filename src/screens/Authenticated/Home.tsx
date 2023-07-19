import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Notifications } from 'expo';
import HomeComponent from '@components/molecules/HomeComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign, Feather } from '@expo/vector-icons';
import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';

import EmojiGreen from '@assets/images/green-emoji.png';
import EmojiOrange from '@assets/images/orange-emoji.png';
import EmojiRed from '@assets/images/red-emoji.png';

import { registerForPushNotificationsAsync } from '@helpers/notifications';
import { BottomTabParamList } from '@navigation/types';
import { useReportsStore, useUserStore } from '@store/store';

import i18n from '@i18n/i18n';
import fonts from '@styles/fonts';
import layout from '@styles/layout';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';
import { getRecommandation } from '@helpers/utils';
import { ImageContext } from '@components/molecules/ImageContext';
import { InformationContext } from '@components/molecules/InformationContext';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<BottomTabParamList, 'Home'>;
};

type Notification = {
  origin: 'selected' | 'received' | 'selected';// Possible values for the origin property
  data: object;// Data object associated with the notification
  remote: boolean;// Boolean flag indicating whether the notification is remote or not
};


const Home = ({ navigation }: Props): ReactElement => {
  const [image, setImage] = useState<ImageSourcePropType>({});
  const [textReco, setTextReco] = useState<string>('');
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const [user, ] = useUserStore({ disease: MALADIE1 });
  const {infoText,setinfoText} = useContext(InformationContext);
  useFocusEffect(
    React.useCallback(() => {
      // Code to execute when the component becomes active (tab is focused)
      console.log('Component is focused');
      setinfoText("Je suis dans la page home !")
      return () => {
        // Code to execute when the component becomes inactive (tab is unfocused)
        console.log('Component is unfocused');
        setinfoText("");
      };
    }, [])
  );
  
  useEffect(() => {
    setinfoText("Je suis dans la page home !");
    // When reports data is available, determine the recommendation and update image and text accordingly
    if (reports) {
      const recommandation = getRecommandation(reports);
      switch (recommandation) {
        case 'end1':
          setImage(EmojiGreen);
          setTextReco(i18n.t('home.end1'));
          break;
        case 'end2':
          setImage(EmojiOrange);
          setTextReco(i18n.t('home.end2'));
          break;
        case 'end2bis':
          setImage(EmojiOrange);
          setTextReco(i18n.t('home.end2bis'));
          break;
        case 'end3':
          setImage(EmojiRed);
          setTextReco(i18n.t('home.end3'));
          break;
      }
    
    }
    return () => {
      setinfoText("");
    }
    
  }, [reports]);


  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <HomeComponent isDataEmpty={user.my_personal_datas && user.my_personal_datas.length>0?false:true}/>
      </View>
    </Container>
    
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layout.padding,
  },
  title: {
    paddingBottom: layout.padding / 2,
  },
  subtitle: {
    marginTop: layout.padding,
    textAlign: 'center',
    fontSize: fonts.subtitle.fontSize - 1,
  },
  recommandationContainer: {
    alignItems: 'center',
  },
  image: {
    marginTop: layout.padding / 2,
    width: 120,
    height: 120,
  },
});
