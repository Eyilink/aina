import React, { ReactElement, useContext, useEffect, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import Title from '@components/atoms/Title';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import HistoryFollowedSymptoms from '@components/atoms/HistoryFollowedSymptoms';
import { DATE_TODAY, MALADIE1, getIconPath, pathologieJSON, symptomeJSON } from '@constants/constants';
import NewSuivi from './NewSuivi';
import { Ionicons } from '@expo/vector-icons';
import layout from '@styles/layout';
import colors from '@styles/colors';
import Container from './Container';
import { useAuthStore, useUserStore, useUsersStore } from '@store/store';
import { useFocusEffect } from '@react-navigation/native';
import { Pathologie, Symptome } from '@store/types';
import json_p from '@assets/json/pathologies.json'
import DataAddPopUp from '@components/popUp/DataAddPopUp';
import { InformationContext } from './InformationContext';
import { InformationContext2 } from './InformationContext2';
import ChangeProfilePopUp from '@components/popUp/ChangeProfilePopUp';
import ProfileAskPersonal from './ProfileAskPersonnal';
import { ScrollView } from 'react-native-gesture-handler';
import BilanAddPopUp from '@components/popUp/BilanAddPopUp';
import ProfilAskPersonal from './ProfilAskPersonal';


type Props = {
  isDataEmpty?: boolean;
  hasFocusChanged?: boolean;

};
// HomeComponent represents the main home screen of the application.
const HomeComponent = ({
  isDataEmpty, hasFocusChanged
}: Props): ReactElement => {
  const [user,] = useUserStore({ disease: MALADIE1 });
  const [ButtonClicked, setButtonClicked] = React.useState(false);

  const [carryOnSuivi, setCarryOnsuivi] = useState(false);
  const [rData, setRData] = useState(false);
  const [bilanData, setBilanData] = useState(false);
  const [, actions] = useAuthStore();
  const { infoText, setinfoText } = useContext(InformationContext);
  const [users,] = useUsersStore();
  const [editPopUp, setEditPopUp] = useState<boolean>(false);
  const [isEditingP, setIsEditingP] = useState<boolean>(false);
  const [isEditingP2, setIsEditingP2] = useState<boolean>(true);
  const [isSuiviClicked, setIsSuiviClicked] = useState<boolean>(false);
  const onEditProfile = (): void => {
    setIsEditingP(true);
    setCarryOnsuivi(true);
    setIsEditingP2(false);
    setButtonClicked(false);
    setIsSuiviClicked(true);

  };
  useEffect(()=>{
    if(hasFocusChanged)
    {
      setIsSuiviClicked(false);
    }
  },[hasFocusChanged])
  // const [users,actionns] = useUsersStore();

  // const {infoText2,setinfoText2} = useContext(InformationContext2);
  const [twoDArray, setTDArray] = useState<string[][]>([
    [
      // "21", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      // "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
      // "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
      // "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
      // "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
      // "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
      // "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
      // "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
      // "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
      // "91", "92", "93", "94", "95", "96", "97", "98", "99", "100",
      // "101", "102", "103", "104", "105", "106", "107", "108", "109", "110",
      // "111", "112", "113", "114", "115", "116", "117", "118", "119", "120",
      // "121", "122", "123", "124", "125", "126", "127", "128", "129", "130",
      // "131", "132", "133", "134", "135", "136", "137", "138", "139", "140",
      // "141", "142", "143", "144", "145", "146", "147", "148", "149", "150",
      // "151", "152", "153", "154", "155", "156", "157", "158", "159", "160",
      // "161", "162", "163", "164", "165", "166", "167", "168", "169", "170",
      // "171", "172", "173", "174", "175", "176", "177", "178", "179", "180",
      // "181", "182", "183", "184", "185", "186", "187", "188", "189", "190",
      // "191", "192", "193", "194", "195", "196", "197", "198", "199", "200",
      // "201", "202", "203", "204", "205", "206", "207", "208", "209", "210",
      // "211", "212", "213", "214", "215", "216", "217", "218", "219", "220",
      // "221", "222", "223", "224", "225", "226", "227", "228", "229", "230",
      // "231", "232", "233", "234", "235", "236", "237", "238", "239", "240",
      // "241", "242", "243", "244", "245", "246", "247", "248", "249", "250",
      // "251", "252", "253", "254", "255", "256", "257", "258", "259", "260",
      // "261", "262", "263", "264", "265", "266", "267", "268", "269", "270",
      // "271", "272", "273", "274", "275", "276", "277", "278", "279", "280",
      // "281", "282", "283", "284", "285", "286", "287", "288", "289", "290",
      // "291", "292", "293", "294", "295", "296", "297", "298", "299", "300",
      // "301", "302", "303", "304", "305", "306", "307", "308", "309", "310",
      // "311", "312", "313", "314", "315", "316", "317", "318", "319", "320",
      // "321", "322", "323", "324", "325", "326", "327", "328", "329", "330",
      // "331", "332", "333", "334", "335", "336", "337", "338", "339", "340",
      // "341", "342", "343", "344", "345", "346", "347", "348", "349", "350",
      // "351", "352", "353", "354", "355", "356", "357", "358", "359", "360"
    ]
  ]);
  const [firstT, setFirstT] = useState(true);
  // ValidatePressed is triggered when the validation button is pressed.
  // It toggles the ButtonClicked state.
  // useEffect(()=>{if(boolC)
  //   setButtonClicked(true);},[])
  useFocusEffect(() => {
    users.map((u, i) => console.log("Nom user numero " + i.toString() + " : " + u.username));

    setinfoText('home.png')
    // console.log("user datas" + user.my_personal_datas.length);
    // if(boolC)
    //   setButtonClicked(!ButtonClicked);
    // setinfoText2('')
    if (isDataEmpty)
      setCarryOnsuivi(false);
    if (firstT) {
      
      if (user.boolF) {
        // processDatas();
       onEditProfile();
        actions.editUserProfile({ key: 'boolF', value: false });
        
      }
      if (user.boolC) {

        //setButtonClicked(true);
        onEditProfile();
        actions.editUserProfile({ key: 'boolC', value: false });
      }
      setFirstT(false);
    }


  })
  function calculateBMI(weightString: string | undefined, heightString: string | undefined): number | undefined {
    if (weightString === undefined || heightString === undefined) {
      return undefined; // Return null if either weight or height is undefined
    }

    const weight = parseFloat(weightString.replace(/[^\d.]/g, ''));
    const height = parseFloat(heightString.replace(/[^\d.]/g, ''));

    if (isNaN(weight) || isNaN(height) || height === 0) {
      return undefined; // Return null if either weight or height is not a valid number, or if height is zero to avoid division by zero
    }

    const heightInMeters = height / 100; // Convert height from centimeters to meters

    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi;
  }

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
  const ValidatePressed = () => {

    setButtonClicked(!ButtonClicked);
  };
  const dateString = DATE_TODAY;
  const [date, time] = dateString.split(' ');
  const [day, month] = date.split('/');

  const parsedDate = `${day}/${month}`;

  return (
    <View style={styles.container}>

      {!ButtonClicked ?
        <>
          {/* If isDataEmpty is true, display a message indicating no data */}
          {isDataEmpty ?
            // <Text style={styles.title}>{i18n.t('home.nodata')}</Text>
            null
            :
            <>
              {carryOnSuivi && isEditingP2 ? <>
                <HistoryFollowedSymptoms />
                <Button text={'Fermer les suivis'} onPress={() => { setCarryOnsuivi(false) }} />
              </> : null}
              {/* <Button
          text="Renseigner une donnée ponctuelle"
          onPress={()=>{}}
          stretch
        /> */}
            </>}
          {/* Display the validation button */}
          {carryOnSuivi ?
            (!isEditingP2 ?
              (isEditingP ?
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
                      initValue={item.id === 43 && calculateBMI(user.my_personal_datas?.find(p => p.id == "21")?.symptoms?.find(s => s.id == 42)?.data?.slice(-1)[0].valeur.toString(), user.my_personal_datas?.find(p => p.id == "21")?.symptoms?.find(s => s.id == 41)?.data?.slice(-1)[0].valeur.toString()) ? calculateBMI(user.my_personal_datas?.find(p => p.id == "21")?.symptoms?.find(s => s.id == 42)?.data?.slice(-1)[0].valeur.toString(), user.my_personal_datas?.find(p => p.id == "21")?.symptoms?.find(s => s.id == 41)?.data?.slice(-1)[0].valeur.toString()) : user.my_personal_datas?.find(p => p.id == "21")?.symptoms?.find(s => s.id == item.id)?.data?.slice(-1)[0].valeur}
                      onTextChange={(text: string) => {
                        addValueUser(item, text);
                      }}
                    />
                  );
                })}
                <Button
                  text={'Valider'}
                  isSelected
                  onPress={() => {
                    setIsEditingP(false);
                    actions.saveUserProfile();
                  }}
                />
              </ScrollView> : <ScrollView>{symptomeJSON
                .filter((item) => {
                  return (
                    item.id === 240 ||
                    item.id === 304 ||
                    item.id === 231 
                  );
                })
                .map((item) => {
                  return (
                    <ProfilAskPersonal
                      nameText={item.name}
                      inputPlaceholder={item.unit}
                      displayPersonal={item.caractere === 'Perso'}
                      initValue={user.my_personal_datas?.find(p => p.id == "21")?.symptoms?.find(s => s.id == item.id)?.data?.slice(-1)[0].valeur}
                      onTextChange={(text: string) => {
                        addValueUser(item, text);
                      }}
                    />
                  );
                })}
                <Button
                  text={'Valider'}
                  isSelected
                  onPress={() => {
                    setIsEditingP(true);
                    setIsEditingP2(true);
                    actions.saveUserProfile();
                    actions.signupUser();
                  }}
                />
              </ScrollView>): null) : (isSuiviClicked ?
              <>
              <Button
                  text={i18n.t('home.button_top')}
                  style={{ minWidth: '90%' }}
                  onPress={() => { setCarryOnsuivi(true) }}

                />
                <Button
                  text={i18n.t('home.button_mid')}
                  style={{ minWidth: '90%' }}
                  onPress={ValidatePressed}

                />
                <Button
                  text={i18n.t('home.button_bot')}
                  style={{ minWidth: '90%' }}
                  onPress={() => { setRData(true) }}

                />
                <DataAddPopUp isVisible={rData} onClose={() => { setRData(false) }} />
              </>:
              <>

                <Button
                  text={i18n.t('home.button_suivi')}
                  style={{ minWidth: '90%' }}
                  onPress={() => { setIsSuiviClicked(true) }}

                />
                <Button
                  text={i18n.t('home.button_bot_bot')}
                  style={{ minWidth: '90%' }}
                  onPress={() => { setBilanData(true); console.log(user.my_personal_datas?.filter(pathologie => pathologie.id >= '36')); }}

                />
                <Button
                  text={i18n.t('home.button_prevent')}
                  style={{ minWidth: '90%' }}
                  onPress={() => { setBilanData(true); console.log(user.my_personal_datas?.filter(pathologie => pathologie.id >= '36')); }}

                />
                <Button
                  text={i18n.t('home.button_share')}
                  style={{ minWidth: '90%' }}
                  onPress={() => { setBilanData(true); console.log(user.my_personal_datas?.filter(pathologie => pathologie.id >= '36')); }}

                />
                {/* <Button
                  text={i18n.t('profile.modif')}
                  style={{ minWidth: '90%' }}
                  onPress={() => {
                    setEditPopUp(true);
                  }}


                /> */}
                <ChangeProfilePopUp isVisible={editPopUp} onClose={() => { setEditPopUp(false); setCarryOnsuivi(false) }} onPressEdit={onEditProfile} />
                
                <BilanAddPopUp isVisible={bilanData} onClose={() => { setBilanData(false) }} />
              </>)}
        </>
        : <>
          {/* Display the back button that allows to go back to the previous screen */}
          <Ionicons
            name="ios-arrow-round-back"
            size={layout.navigation.previousIcon.size}
            color={colors.black}
            onPress={ValidatePressed}
            style={{ marginLeft: 12 }}
          />
          <View style={styles.newsuivicontainer}>
            <NewSuivi onPress={ValidatePressed} setButtonNewSuiviClicked={setButtonClicked} />
          </View>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

  },
  custom_title: {
    fontSize: 30,

    textAlign: 'center'
  },
  title: {
    fontSize: 24,

    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: '60%'
  },
  newsuivicontainer: {
    flex: 1,

  }
});


export default HomeComponent;
