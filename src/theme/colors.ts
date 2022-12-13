const white = '#FFFFFF';
const white2 = '#EEEEEE';
const black = '#000000';
const activeTab = '#0296E5';
const gray = '#242A32';
const gray2 = '#3A3F47';
const gray3 = '#67686D';
const gray4 = '#1E1E1E';
const gray5 = '#252836';
const gray6 = '#92929D';

const primaryPalette = {
  primary: '#0232EB',
};

const primaryBlueColor = '#0296E5';

const redPalette = {
  red: '#EF4444',
};

const orange = '#FF8700';

export const colors = {
  white,
  white2,
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparent: 'rgba(0, 0, 0, 0)',
  backdrop: 'rgba(0, 0, 0, 0.4)',
  ...primaryPalette,
  gray,
  gray2,
  gray3,
  gray4,
  gray5,
  gray6,
  activeTab,
  ...redPalette,
  orange,

  text: gray[800],
  input: gray[800],
  border: gray[200],
  background: white,
  disabledText: gray[500],
  disabledBackground: gray[200],

  black,
  primaryBlueColor,
};

export type ColorsTypes = keyof typeof colors;
