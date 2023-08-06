import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import InputText from '@components/atoms/InputText';
import Previous from '@components/atoms/Previous';

import { useAuthStore, useUserStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError, isNumeric } from '@helpers/utils';
import JsonS from '@assets/json/symptomes.json'
import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import ProfileAskPersonal from '@components/molecules/ProfileAskPersonnal';
import { ScrollView } from 'react-native-gesture-handler';
import { MALADIE1 } from '@constants/constants';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Age'>;
};

const BirthDateForm = ({ navigation }: Props) => {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('0');
  const [year, setYear] = useState('2023');
  const [, actions] = useAuthStore();
  const [user,] = useUserStore({disease: MALADIE1});
  const [code,setCode] = useState<string>();
  const [nom, setNom] = useState<string>();
  const [dateNaissance, setDateNaissance] = useState<string>();
  const [prenom, setPrenom] = useState<string>();
  const [tel, setTel] = useState<string>();
  const [mail, setMail] = useState<string>();
  
  const onChangeDay = (value : string) => {
    setDay(value);
  };

  const onChangeMonth = (value : string) => {
    setMonth(value);
  };

  const onChangeYear = (value : string) => {
    setYear(value);
  };

  const calculateAge = (birthDate: string): string => {
    const currentDate = new Date();
    const [day, month, year] = birthDate.split('-').map(Number);
  
    const yearsDiff = currentDate.getFullYear() - year;
    const monthsDiff = currentDate.getMonth() - month +1;
    const daysDiff = currentDate.getDate() - day;
  
    // Adjust the age if the current date is before the birth date
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      console.log(String(yearsDiff - 1))
      return String(yearsDiff - 1);
    }
    console.log(String(yearsDiff));
    return String(yearsDiff);
  };
  
  

  const onValidate = () => {
    const birthDate = `${day}-${parseInt(month) + 1}-${year}`;
    const isValidDate = validateDate(birthDate);
    if (!isValidDate) {
      alert('Invalid date');
    } else {
      console.log(birthDate);
      const age = calculateAge(birthDate);
      actions.editUserProfile({ key: 'birthDate', value: birthDate });
      actions.editUserProfile({ key: 'age', value: age });
      navigation.navigate("Reminder");
      console.log(birthDate);
    }
  };

  const validateDate = (birthDate: string) => {
    return parseInt(calculateAge(birthDate))>=0; // Replace this with your validation logic
  };

  const monthNames = [
    i18n.t('months.january'),
    i18n.t('months.february'),
    i18n.t('months.march'),
    i18n.t('months.april'),
    i18n.t('months.may'),
    i18n.t('months.june'),
    i18n.t('months.july'),
    i18n.t('months.august'),
    i18n.t('months.september'),
    i18n.t('months.october'),
    i18n.t('months.november'),
    i18n.t('months.december'),
  ];

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={user.username} />
          <Previous />
        </View>
        {/* <SubTitle text={i18n.t('signup.questions.dateDeNaissance')} /> */}
        {/* <View style={styles.pickerContainer}>
          <View style={styles.pickerItem}>
            <Picker
              selectedValue={day}
              onValueChange={onChangeDay}
              style={styles.picker}
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <Picker.Item key={day} label={day.toString()} value={day.toString()} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerItem}>
            <Picker
              selectedValue={month}
              onValueChange={onChangeMonth}
              style={styles.picker}
            >
              {monthNames.map((month, index) => (
                <Picker.Item key={index} label={month} value={index.toString()} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerItem}>
            <Picker
              selectedValue={year}
              onValueChange={onChangeYear}
              style={styles.picker}
            >
              {Array.from({ length: 100 }, (_, i) => 2023 - i).map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year.toString()} />
              ))}
            </Picker>
          </View>
        </View> */}
        <ScrollView>
        <ProfileAskPersonal
                      nameText={'Nom : '}
                      inputPlaceholder={''}
                      displayPersonal
                      onTextChange={(text: string) => setNom(text)} 
                      initValue={JsonS.find(i => i.id == 7)?.unit}                  />
                  <ProfileAskPersonal
                    nameText={'Date de nais. : '}
                    inputPlaceholder={JsonS.find(i => i.id == 11)?.unit}
                    displayPersonal
                    onTextChange={(text: string) => setDateNaissance(text)}
                    initValue={''} 
                  />
                  <ProfileAskPersonal
                    nameText={'Prénom : '}
                    inputPlaceholder={JsonS.find(i => i.id == 8)?.unit}
                    displayPersonal={false}
                    onTextChange={(text: string) => setPrenom(text)}
                    initValue={''} 
                  />
                  <ProfileAskPersonal
                    nameText={'Code : '}
                    inputPlaceholder={JsonS.find(i => i.id == 6)?.unit}
                    displayPersonal={false}
                    onTextChange={(text: string) => setCode(text)}
                    initValue={''} 
                  />
                  <ProfileAskPersonal
                    nameText={'Tel : '}
                    inputPlaceholder={JsonS.find(i => i.id == 14)?.unit}
                    displayPersonal
                    onTextChange={(text: string) => setTel(text)}
                    initValue={''} 
                  />
                  <ProfileAskPersonal
                    nameText={'Mail : '}
                    inputPlaceholder={JsonS.find(i => i.id == 15)?.unit}
                    displayPersonal
                    onTextChange={(text: string) => setMail(text)}
                    initValue={''} 
                  />
                  <Button
                    text={'Valider'}
                    isSelected
                    onPress={() => {
                      // setValid(!vali);
                      actions.editUserProfile({ key: 'code', value: code ? code.trim() : "" });
                      actions.editUserProfile({ key: 'nom', value: nom ? nom.trim() : "" });
                      actions.editUserProfile({ key: 'birthDate', value: dateNaissance ? dateNaissance.trim() : "" });
                      actions.editUserProfile({ key: 'prenom', value: prenom ? prenom.trim() : "" });
                      actions.editUserProfile({ key: 'tel', value: tel ? tel.trim() : "" });
                      actions.editUserProfile({ key: 'mail', value: mail ? mail.trim() : "" });
                      navigation.navigate("Reminder");
                     
                    }}
                  />
        </ScrollView>
        
      </View>
    </Container>
  );
};

export default BirthDateForm;



const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  pickerItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  button: {
    backgroundColor:'#EE4483',
    marginTop:100
  }
});
