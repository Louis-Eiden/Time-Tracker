import { Platform } from 'react-native';

export const isMobileOrTablet = () => {
  return Platform.OS === 'ios' || Platform.OS === 'android';
};

export const isTouchDevice = () => {
  if (Platform.OS === 'web') {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }
  return Platform.OS === 'ios' || Platform.OS === 'android';
};
