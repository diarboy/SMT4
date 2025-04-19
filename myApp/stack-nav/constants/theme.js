import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Colors
export const COLORS = {
  // Primary and variations
  primary: '#1A9CB7', // Teal
  primaryLight: '#5BC7D9',
  primaryDark: '#0C7A8F',
  primaryTransparent: 'rgba(26, 156, 183, 0.1)',
  
  // Secondary and variations
  secondary: '#F47C5D', // Coral/Orange
  secondaryLight: '#FFA98C',
  secondaryDark: '#D85A3A',
  secondaryTransparent: 'rgba(244, 124, 93, 0.1)',
  
  // Accent
  accent: '#9567FB', // Purple
  accentLight: '#B88FFF',
  accentDark: '#7744E8',
  accentTransparent: 'rgba(149, 103, 251, 0.1)',
  
  // Status
  success: '#48BB78',
  warning: '#F6BD16',
  error: '#F56565',
  info: '#4299E1',

  // Neutrals
  white: '#FFFFFF',
  lightGray1: '#F7F9FC',
  lightGray2: '#E5E9F2',
  lightGray3: '#D0D7E5',
  gray: '#96A2B6',
  darkGray1: '#647084',
  darkGray2: '#3B4453',
  darkGray3: '#1D2533',
  black: '#0D121F',
  
  // Glass effect
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBackground: 'rgba(255, 255, 255, 0.7)',
  glassBackgroundDark: 'rgba(29, 37, 51, 0.7)',
  overlay: 'rgba(13, 18, 31, 0.4)',
  
  // Transparent
  transparent: 'transparent',
};

// Typography
export const SIZES = {
  // Base sizes
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  xxxlarge: 40,
  
  // Specific font sizes
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  body1: 16,
  body2: 14,
  body3: 12,
  
  // App dimensions
  width,
  height,
};

// Fonts
export const FONTS = {
  light: { fontFamily: 'Poppins-Light' },
  regular: { fontFamily: 'Poppins-Regular' },
  medium: { fontFamily: 'Poppins-Medium' },
  semiBold: { fontFamily: 'Poppins-SemiBold' },
  bold: { fontFamily: 'Poppins-Bold' },
  
  h1: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 32 },
  h3: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 28 },
  h4: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 26 },
  h5: { fontFamily: 'Poppins-Medium', fontSize: SIZES.h5, lineHeight: 24 },
  body1: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 24 },
  body2: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 22 },
  body3: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body3, lineHeight: 18 },
  button: { fontFamily: 'Poppins-Medium', fontSize: SIZES.font, lineHeight: 22 },
  caption: { fontFamily: 'Poppins-Regular', fontSize: SIZES.small, lineHeight: 16 },
};

// Spacing
export const SPACING = {
  xxxs: SIZES.base * 0.5, // 4
  xxs: SIZES.base, // 8
  xs: SIZES.base * 1.5, // 12
  s: SIZES.base * 2, // 16
  m: SIZES.base * 3, // 24
  l: SIZES.base * 4, // 32
  xl: SIZES.base * 5, // 40
  xxl: SIZES.base * 6, // 48
  xxxl: SIZES.base * 8, // 64
};

// Border radius
export const RADIUS = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  circle: 999,
};

export default { COLORS, SIZES, FONTS, SPACING, RADIUS };