import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';
import AppText from '@components/atoms/AppText';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

interface DropdownItem {
  title: string;
  icon: ImageSourcePropType;
}

interface DropdownMenuProps {
  items: DropdownItem[];
}

interface chk_BoxProps {
    index: number;
    title: string;
    
  }
  
const Chk_Box : React.FC<chk_BoxProps> = ({index,title }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleIsChecked = () => {
        setIsChecked(!isChecked);
      };
    return(
        <TouchableOpacity
        key={index}
        style={[styles.itemContainer, isChecked && styles.checkedItemContainer]}
        onPress={handleIsChecked}
      >
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
          {isChecked && <Entypo name="check" size={24} color="#ffffff" style={{}}/>}
        </View>
        <View style={styles.itemTitleContainer}>
          <AppText style={styles.itemTitle} text={title} />
        </View>
      </TouchableOpacity>
    )

}

const ScrollDownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  const [isSymptom, setIsSymptom] = useState<boolean>(false);
 

  useEffect(() => {
    setIsSymptom(false);
  }, []);

  const handleItemPress = () => {
    setIsSymptom(true);
  };

  

  const handleArrowClick = () => {
    setIsSymptom(!isSymptom);
  };

  return (
    <View style={styles.container}>
      {isSymptom && (
        <TouchableOpacity style={styles.arrowContainer} onPress={handleArrowClick}>
          <AntDesign style={styles.arrowContainer} name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      {isSymptom ? (
        <ScrollView>
          {items.map((item, index) => (
           <Chk_Box index={index} title={item.title} />
          ))}
        </ScrollView>
      ) : (
        <ScrollView>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={handleItemPress}
            >
              <View style={styles.itemIconContainer}>
                <Image style={{ width: 40, height: 40 }} source={item.icon} />
              </View>
              <View style={styles.itemTitleContainer}>
                <AppText style={styles.itemTitle} text={item.title} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Set the gray background color
  },
  arrowContainer: {
    alignItems: 'flex-start',
    paddingLeft: 16,
    paddingTop: 16,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    // Add styles for the arrow icon, such as color or custom image
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff', // Set the white background color for each item
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  itemIconContainer: {
    marginRight: 16,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000', // Set the color of the title
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#00cc00',
    borderRadius: 4,
    marginRight: 16,
  },
  checkedCheckbox: {
    backgroundColor: '#00cc00',
    borderColor: '#ffffff',
  },
  checkedItemContainer: {
    // backgroundColor: '#00cc00',
  },

});

export default ScrollDownMenu;
