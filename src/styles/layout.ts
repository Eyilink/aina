import { Dimensions } from 'react-native';

import colors from '@styles/colors';

const { width, height } = Dimensions.get('window');

export default {
  window: { width, height },
  padding: 32,
  navigation: {
    tabIconSize: 24,
    previousIcon: {
      size: 36,
    },
  },
  buttons: {
    borderRadius: 8,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
