import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUnixTime } from 'date-fns';
import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';
import DateTimePicker from '@components/molecules/DateTimePicker';
import json_p from '@assets/json/pathologies.json';
import { useAuthStore, useUserStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';
import {
  registerForPushNotificationsAsync,
  scheduleLocalNotification
} from '@helpers/notifications';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import { MALADIE1, symptomeJSON, calculateBMI, getIconPath, pathologieJSON, DATE_TODAY } from '@constants/constants';
import ProfileAskPersonal from '@components/molecules/ProfileAskPersonnal';
import { Pathologie, Symptome } from '@store/types';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Reminder'>;
};

const Reminder = ({ navigation }: Props): ReactElement => {
  const [reminder, setReminder] = useState<boolean>(false);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [hasUserChosen, setHasUserChosen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, actions] = useAuthStore();
  const [user, ] = useUserStore({ disease: MALADIE1 });
  useFocusEffect(()=>{
    if (user.boolF) {
      processDatas();
      actions.editUserProfile({ key: 'boolF', value: false });
    }
  })

  const [twoDArray, setTDArray] = useState<string[][]>([
    [
      "21", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
      "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
      "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
      "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
      "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
      "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
      "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
      "91", "92", "93", "94", "95", "96", "97", "98", "99", "100",
      "101", "102", "103", "104", "105", "106", "107", "108", "109", "110",
      "111", "112", "113", "114", "115", "116", "117", "118", "119", "120",
      "121", "122", "123", "124", "125", "126", "127", "128", "129", "130",
      "131", "132", "133", "134", "135", "136", "137", "138", "139", "140",
      "141", "142", "143", "144", "145", "146", "147", "148", "149", "150",
      "151", "152", "153", "154", "155", "156", "157", "158", "159", "160",
      "161", "162", "163", "164", "165", "166", "167", "168", "169", "170",
      "171", "172", "173", "174", "175", "176", "177", "178", "179", "180",
      "181", "182", "183", "184", "185", "186", "187", "188", "189", "190",
      "191", "192", "193", "194", "195", "196", "197", "198", "199", "200",
      "201", "202", "203", "204", "205", "206", "207", "208", "209", "210",
      "211", "212", "213", "214", "215", "216", "217", "218", "219", "220",
      "221", "222", "223", "224", "225", "226", "227", "228", "229", "230",
      "231", "232", "233", "234", "235", "236", "237", "238", "239", "240",
      "241", "242", "243", "244", "245", "246", "247", "248", "249", "250",
      "251", "252", "253", "254", "255", "256", "257", "258", "259", "260",
      "261", "262", "263", "264", "265", "266", "267", "268", "269", "270",
      "271", "272", "273", "274", "275", "276", "277", "278", "279", "280",
      "281", "282", "283", "284", "285", "286", "287", "288", "289", "290",
      "291", "292", "293", "294", "295", "296", "297", "298", "299", "300",
      "301", "302", "303", "304", "305", "306", "307", "308", "309", "310",
      "311", "312", "313", "314", "315", "316", "317", "318", "319", "320",
      "321", "322", "323", "324", "325", "326", "327", "328", "329", "330",
      "331", "332", "333", "334", "335", "336", "337", "338", "339", "340",
      "341", "342", "343", "344", "345", "346", "347", "348", "349", "350",
      "351", "352", "353", "354", "355", "356", "357", "358", "359", "360"
    ]
  ]);

  const processDatas = () => {
    const updatedPathos = twoDArray.map((objet, index) => {
      const nm = pathologieJSON.find((obj) => obj.id === objet[0])?.name;
      const pd_obj = user.my_personal_datas?.find((obj) => obj.id == objet[0]);
      const newE: Pathologie = {
        id: objet[0],
        name: nm ? nm : "",
        symptoms: symptomeJSON
          .filter((obj) => objet.slice(1).includes(obj.id.toString()))
          .map((filteredObj) => ({
            id: filteredObj.id,
            name: filteredObj.name,
            type: filteredObj.type,
            frequency: filteredObj.frequency,
            data: pd_obj ? pd_obj.symptoms.find((s) => s.id == filteredObj.id)?.data : null,
            unit: filteredObj.unit,
            valMax: filteredObj.valMax,
            valMin: filteredObj.valMin
          })),
        icon: getIconPath(
          pathologieJSON.find((obj) => obj.id === objet[0])?.namelogo?.toString()
        ),
        date: user.my_personal_datas?.find((obj) => obj.id == objet[0])?.date ? user.my_personal_datas.find((obj) => obj.id == objet[0])?.date : DATE_TODAY,
        namelogo: json_p.find((obj) => obj.id.toString() == objet[0])?.logo,

      };
      return newE;
    });

    actions.editUserProfile({ key: 'my_personal_datas', value: updatedPathos });
    console.log(updatedPathos)
  };

  const addValueUser = (sympt: Symptome, val: string) => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
  
    const formattedDate = `${day}/${month}/${year}`;
    // Iterate over each pathology in my_personal_datas
    user.my_personal_datas.forEach((pathology) => {
      // Find the symptoms with the same id as the provided sympt
      const symptomsToUpdate = pathology.symptoms.filter((symptom) => symptom.id === sympt.id);
  
      // Update the data field of each matching symptom
  
      if (symptomsToUpdate[0]) {
  
        const newData = { date: formattedDate, valeur: val };
  
        if (!symptomsToUpdate[0].data) {
          // If data field doesn't exist, create a new array with the new data
          symptomsToUpdate[0].data = [newData];
        } else {
          // If data field already exists, concatenate the new data to the existing array
          symptomsToUpdate[0].data = symptomsToUpdate[0].data.concat(newData);
        }
      }
  
      console.log(pathology.symptoms);
      console.log("Value added !")
    });
  };

  const onValidate = async (): Promise<void> => {
    
    if (!hasUserChosen) alertError({});
    else if (reminder) {
      setIsPickerVisible(false)
      setIsLoading(true);
      await registerForPushNotificationsAsync();
      await scheduleLocalNotification(
        getUnixTime(date)
      )
      actions.editUserProfile({
        key: 'reminder',
        value: {
          isActive: reminder,
          date: getUnixTime(date)
        }
      });
      setIsLoading(false);
      navigation.navigate('ProfileCreated');
    } else if (!reminder) {
      actions.editUserProfile({
        key: 'reminder',
        value: { isActive: reminder },
      });
      //navigation.navigate('ProfileCreated');
      actions.editUserProfile({key: 'boolC',value: false});
      actions.editUserProfile({key: 'boolF',value: false});
      actions.addUser(user);
      actions.saveUsersToAsyncStorage();
      actions.signupUser();
    } else navigation.navigate('ProfileCreated');
  };

  const onCancelPicker = (): void => {
    setIsPickerVisible(false);
    setHasUserChosen(false);
  };

  const onConfirmDate = (date:Date): void => {
    setIsPickerVisible(false)
    setDate(
      new Date(date.nativeEvent.timestamp)
    )
  };

  const onPressYes = (): void => {
    setHasUserChosen(true);
    setReminder(true);
    setIsPickerVisible(true);
  };

  const onPressNo = (): void => {
    setHasUserChosen(true);
    setReminder(false);
    setDate(null);
    setIsPickerVisible(false)
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <ScrollView>{symptomeJSON
                .filter((item) => {
                  return (
                    item.id === 41 ||
                    item.id === 42 ||
                    item.id === 43 ||
                    item.id === 122 ||
                    item.id === 133 ||
                    item.id === 131 ||
                    item.id === 251 ||
                    item.id === 252 ||
                    item.id === 253 ||
                    item.id === 254 ||
                    item.id === 255 ||
                    item.id === 256 ||
                    item.id === 257
                  );
                })
                .map((item) => {
                  return (
                    <ProfileAskPersonal
                      nameText={item.name}
                      inputPlaceholder={item.unit}
                      displayPersonal={item.caractere === 'Perso'}
                      onTextChange={(text: string) => {
                        //addValueUser(item, text);
                      }}
                    />
                  );
                })}
                <Button
                  text={'Valider'}
                  isSelected
                  onPress={() => {
      //               actions.editUserProfile({key: 'boolC',value: false});
      // actions.editUserProfile({key: 'boolF',value: false});
      // actions.addUser(user);
      // actions.saveUsersToAsyncStorage();
      // actions.signupUser();
                    actions.saveUserProfile();
                    actions.signupUser();
                  }}
                />
              </ScrollView>
        {/* <ScrollView persistentScrollbar>
          <SubTitle text={i18n.t('signup.questions.reminder')} />
          <Button
            text={
              date
                ? `${i18n.t('commons.yes')} ${i18n.t(
                    'commons.linkingWords.a',
                  )} ${date.getHours()}${i18n.t('commons.linkingWords.h')}${
                    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
                  }`
                : i18n.t('commons.yes')
            }
            onPress={onPressYes}
            isSelected={hasUserChosen ? reminder : false}
            stretch
          />
          <Button
            text={i18n.t('commons.no')}
            onPress={onPressNo}
            isSelected={hasUserChosen ? !reminder : false}
            stretch
          />
          <Button
            text={i18n.t('signup.validate')}
            onPress={onValidate}
            isLoading={isLoading}
            disabled={isLoading}
            isValidate
          />
          {reminder&&isPickerVisible&&<DateTimePicker
            onCancel={onCancelPicker}
            onConfirm={onConfirmDate}
            mode="time"
            isVisible={true}
          />}
        </ScrollView> */}
      </View>
    </Container>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
