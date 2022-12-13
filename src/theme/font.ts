const type = {
  // regular: 'almarai_regular',
  // light: 'almarai_light',
  // bold: 'almarai_bold',
  // extraBold: 'almarai_extra_bold',
  regular: 'Almarai-Regular',
  light: 'Almarai-Light',
  bold: 'Almarai-Bold',
  extraBold: 'Almarai-ExtraBold',
};

const size = {
  xLarge: 22,
  large: 18,
  medium: 16,
  small: 14,
  xSmall: 12,
};

const lineHeight = {
  xLarge: 30,
  large: 24,
  medium: 22,
  small: 20,
  xSmall: 16,
};

export const typography = {
  // XL
  xLargeLight: {
    fontFamily: type.light,
    fontSize: size.xLarge,
    lineHeight: lineHeight.xLarge,
  },
  xLargeRegular: {
    fontFamily: type.regular,
    fontSize: size.xLarge,
    lineHeight: lineHeight.xLarge,
  },
  xLargeBold: {
    fontFamily: type.bold,
    fontSize: size.xLarge,
    lineHeight: lineHeight.xLarge,
  },
  xLargeExtraBold: {
    fontFamily: type.extraBold,
    fontSize: size.xLarge,
    lineHeight: lineHeight.xLarge,
  },
  // L
  largeLight: {
    fontFamily: type.light,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  largeRegular: {
    fontFamily: type.regular,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  largeBold: {
    fontFamily: type.bold,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  largeExtraBold: {
    fontFamily: type.extraBold,
    fontSize: size.large,
    lineHeight: lineHeight.large,
  },
  // M
  mediumLight: {
    fontFamily: type.light,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },
  mediumRegular: {
    fontFamily: type.regular,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },
  mediumBold: {
    fontFamily: type.bold,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },
  mediumExtraBold: {
    fontFamily: type.extraBold,
    fontSize: size.medium,
    lineHeight: lineHeight.medium,
  },
  // S
  smallLight: {
    fontFamily: type.light,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },
  smallRegular: {
    fontFamily: type.regular,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },
  smallBold: {
    fontFamily: type.bold,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },
  smallExtraBold: {
    fontFamily: type.extraBold,
    fontSize: size.small,
    lineHeight: lineHeight.small,
  },
  // XS
  xSmallLight: {
    fontFamily: type.light,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
  xSmallRegular: {
    fontFamily: type.regular,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
  xSmallBold: {
    fontFamily: type.bold,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
  xSmallExtraBold: {
    fontFamily: type.extraBold,
    fontSize: size.xSmall,
    lineHeight: lineHeight.xSmall,
  },
  error: {
    fontFamily: type.light,
    fontSize: size.small,
    lineHeight: lineHeight.xSmall,
  },
  backend_error: {
    fontFamily: type.regular,
    fontSize: size.small,
    lineHeight: lineHeight.xSmall,
  },
};

export type TypographyTypes = keyof typeof typography;

export const font = {
  ...type,
  lineHeight,
  size,
};
