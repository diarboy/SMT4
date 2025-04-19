import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, RADIUS, SPACING } from '@/constants/theme';

const GlassCard = ({ 
  children, 
  style, 
  intensity = 60, 
  tint = 'light', 
  borderRadius = RADIUS.m 
}) => {
  return (
    <View style={[styles.container, { borderRadius }, style]}>
      <BlurView intensity={intensity} tint={tint} style={[styles.blur, { borderRadius }]}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  blur: {
    overflow: 'hidden',
    padding: SPACING.xxxs,
  }
});

export default GlassCard;