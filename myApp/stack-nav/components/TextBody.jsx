import React from 'react';
import { Text } from 'react-native';
import { fonts } from '../assets/utils/fonts';

export default function TextBody({ style, children, ...props }) {
  return (
    <Text style={[{ fontSize: 20, fontFamily: fonts.Regular }, style]} {...props}>
      {children}
    </Text>
  );
}
