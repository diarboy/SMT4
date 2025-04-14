import React from 'react';
import { Text } from 'react-native';
import { fonts } from '../assets/utils/fonts';

export default function TextHeading({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: fonts.Heading, fontSize: 48 }, style]} {...props}>
      {children}
    </Text>
  );
}
