import {Dimensions, Platform} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const spacing = {
  none: 0,
  tiny: 4,
  smaller: 6,
  small: 8,
  medium: 12,
  normal: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 28,
  xxxLarge: 34,
  huge: 40,
  content: 15,
};

export type SpacingTypes = keyof typeof spacing;

export const screen = {
  width,
  height,
  contentWidth: width - spacing.content * 2,
  contentOffset: spacing.content,
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const TAB_BAR_HEIGHT = 80;
