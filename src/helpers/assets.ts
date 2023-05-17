import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export const cacheResources = async (): Promise<void[]> => {
  const images = [
    require('@assets/images/app-icon.png'),
    require('@assets/images/splash.png'),
    require('@assets/images/red-emoji.png'),
    require('@assets/images/orange-emoji.png'),
    require('@assets/images/green-emoji.png'),
  ];
  const cacheImages = images.map((image) =>
    Asset.fromModule(image).downloadAsync(),
  );
  const fonts = Font.loadAsync({
    'CeraRoundPro-Thin': require('@assets/fonts/CeraRoundPro-Thin.otf'),
    'CeraRoundPro-Regular': require('@assets/fonts/CeraRoundPro-Regular.otf'),
    'CeraRoundPro-Bold': require('@assets/fonts/CeraRoundPro-Bold.otf'),
  });
  const icons = [
    Feather.font,
    Ionicons.font,
    AntDesign.font,
    MaterialCommunityIcons.font,
  ].map((font) => Font.loadAsync(font));

  return Promise.all([...cacheImages, fonts, ...icons]);
};
