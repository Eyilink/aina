import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Evaluateurs, MALADIE1 } from '@constants/constants';
import { useAuthStore, useUserStore } from '@store/store';
import Title from '@components/atoms/Title';
import AppText from '@components/atoms/AppText';
import Button from '@components/atoms/Button';
import { AntDesign } from '@expo/vector-icons';
import { Antecedent, Remarque, Vaccin } from '@store/types';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const RemarquePopup: React.FC<Props> = ({ isVisible, onClose }) => {
  const [evaluateur, setEvaluateur] = useState(true);
  const [showSection, setShowSection] = useState(null); // 'remarks', 'antecedents', 'vaccinations'
  const [remarks, setRemarks] = useState([]);
  const [antecedents, setAntecedents] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [inputText, setInputText] = useState('');
  const [user,] = useUserStore({ disease: MALADIE1 });
  const [, actions] = useAuthStore();
  const { height, width } = Dimensions.get('window');
  const [r, setR] = useState<Remarque[]>([]);
  const [a, setA] = useState<Antecedent[]>([]);
  const [v, setV] = useState<Vaccin[]>([]);
  useEffect(() => {
    
    if (user && user.remarques) {
     
      const updatedItems = user.remarques.map(r => ({
        text: r.remarque,
        date: r.date,
        qui: r.qui 
      }));
  
     
      setRemarks(updatedItems);
    }
    if (user && user.antecedents) {
     
      const updatedItems = user.antecedents.map(r => ({
        text: r.antecedent,
        date: r.date,
        qui: r.qui 
      }));
  
     
      setAntecedents(updatedItems);
    }
    if (user && user.vaccins) {
     
      const updatedItems = user.vaccins.map(r => ({
        text: r.vaccin,
        date: r.date,
        qui: r.qui 
      }));
  
     
      setVaccinations(updatedItems);
    }
    
  }, []); 
  useEffect(() => {
    // Transform the remarks only if they exist and set them to state
    if (remarks) {
      const transformedRemarks = remarks.map((remark: any) => ({
        remarque: remark.text,
        date: remark.date,
        qui: remark.qui
      }));
      setR(transformedRemarks);
    }
  }, [remarks]);
  useEffect(() => {
    // Transform the remarks only if they exist and set them to state
    if (antecedents) {
      const transformedAnts = antecedents.map((ant: any) => ({
        antecedent: ant.text,
        date: ant.date,
        qui: ant.qui
      }));
      setA(transformedAnts);
    }
  }, [antecedents]);
  useEffect(() => {
    // Transform the remarks only if they exist and set them to state
    if (vaccinations) {
      const transformedVaccs = vaccinations.map((vac: any) => ({
        antecedent: vac.text,
        date: vac.date,
        qui: vac.qui
      }));
      setV(transformedVaccs);
    }
  }, [vaccinations]);

  useEffect(() => {
    // Update the user profile when 'r' changes and is not empty
    if (r.length > 0) {
      user.remarques = r;
    };
    actions.saveUserProfile();
  }
    , [r, user, actions]);

  useEffect(() => {
    // Update the user profile when 'r' changes and is not empty
    if (a.length > 0) {
      user.antecedents = a;
    };
    actions.saveUserProfile();
  }
    , [a, user, actions]);
  useEffect(() => {
    // Update the user profile when 'r' changes and is not empty
    if (v.length > 0) {
      user.antecedents = v;
    };
    actions.saveUserProfile();
  }
    , [v, user, actions]);

  const handleAddItem = () => {
    if (inputText.trim()) {
      const newItem = {
        text: inputText,
        date: new Date().toISOString(),
        qui: 'User'  // Placeholder for user identification
      };
      if (showSection === 'remarks') {
        const updatedItems = [...remarks, newItem];
        setRemarks(updatedItems);
      } else if (showSection === 'antecedents') {
        const updatedItems = [...antecedents, newItem];
        setAntecedents(updatedItems);
      } else if (showSection === 'vaccinations') {
        const updatedItems = [...vaccinations, newItem];
        setVaccinations(updatedItems);
      }
      setInputText('');
    }
  };

  const renderItemSection = (items) => items.map((item, index) => (
    <View key={index} style={styles.remarkItem}>
      <AppText text={`${item.text} (${item.date}, ${item.qui})`} />
    </View>
  ));

  return (
    <Modal visible={isVisible} transparent>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[styles.popV2, { width: width, height: height }]}>
          {!showSection ? (
            <View>
              <Button text="Remarques" onPress={() => setShowSection('remarks')} />
              <Button text="Antécédents" onPress={() => setShowSection('antecedents')} />
              <Button text="Vaccinations" onPress={() => setShowSection('vaccinations')} />
            </View>
          ) : (
            <View style={{ flex: 1, width: '100%' }}>
              <TouchableOpacity style={styles.backButton} onPress={() => setShowSection(null)}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <ScrollView style={{ flex: 1, paddingTop: 30 }}>
                {showSection === 'remarks' && renderItemSection(remarks)}
                {showSection === 'antecedents' && renderItemSection(antecedents)}
                {showSection === 'vaccinations' && renderItemSection(vaccinations)}
              </ScrollView>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={`Add new ${showSection.slice(0, -1)}...`}
                  value={inputText}
                  onChangeText={setInputText}
                />
                <Button text="+" isSelected onPress={handleAddItem} />
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popV2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  remarkItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
});

export default RemarquePopup;
