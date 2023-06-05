import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import InputText from '@components/atoms/InputText';
import Previous from '@components/atoms/Previous';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError, isNumeric } from '@helpers/utils';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Age'>;
};

const BirthDateForm = ({ navigation }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [, actions] = useAuthStore();

  const onChangeDay = (value) => {
    setDay(value);
  };

  const onChangeMonth = (value) => {
    setMonth(value);
  };

  const onChangeYear = (value) => {
    setYear(value);
  };

  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const [year, month, day] = birthDate.split('-').map(Number);
  
    const yearsDiff = currentDate.getFullYear() - year;
    const monthsDiff = currentDate.getMonth() + 1 - month;
    const daysDiff = currentDate.getDate() - day;
  
    // Adjust the age if the current date is before the birth date
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1;
    }
  
    return yearsDiff;
  };
  

  const onValidate = () => {
    const isValidDate = validateDate(day, month, year);
    if (!isValidDate) {
      alert('Invalid date');
    } else {
      const birthDate = `${year}-${month}-${day}`;
      const age = calculateAge(birthDate);
      actions.editUserProfile({ key: 'birthDate', value: birthDate });
      actions.editUserProfile({ key: 'age', value: age });
      navigation.navigate("Size");
    }
  };

  const validateDate = (day, month, year) => {
    // Perform validation logic here
    return true; // Replace this with your validation logic
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
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle text={i18n.t('signup.questions.dateDeNaissance')} />
        <View style={styles.pickerContainer}>
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
        </View>
        <Button text={i18n.t('signup.validate')} onPress={onValidate} isValidate />
      </View>
    </Container>
  );
};

export default BirthDateForm;


// const Age = ({ navigation }: Props): ReactElement => {
//   const [age, onChange] = useState<string>('');
//   const [, actions] = useAuthStore();

//   const onValidate = (): void => {
//     if (age.length !== 2 || !isNumeric(age)) alertError({});
//     else {
//       actions.editUserProfile({ key: 'age', value: parseInt(age, 10) });
//       navigation.navigate('PostalCode');
//     }
//   };

//   return (
//     <Container>
//       <View style={styles.container}>
//         <View style={styles.titleContainer}>
//           <Title text={i18n.t('signup.sectionTitle')} />
//           <Previous />
//         </View>
//         <SubTitle text={i18n.t('signup.questions.dateDeNaissance')} />
//         <InputText
//           value={age}
//           cellCount={2}
//           onChange={onChange}
//           unit={i18n.t('commons.units.years')}
//         />
//         <Button
//           text={i18n.t('signup.validate')}
//           onPress={onValidate}
//           isValidate
//         />
//       </View>
//     </Container>
//   );
// };

// export default Age;

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
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
});
