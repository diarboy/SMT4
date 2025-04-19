import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, RADIUS } from '@/constants/theme';
import GlassCard from './GlassCard';

const StatusCard = ({
  title,
  value,
  icon,
  color = COLORS.primary,
  delay = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(0.95);
  
  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
      translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
      scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    }, delay);
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  
  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            {icon}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '45%',
  },
  card: {
    padding: 0,
  },
  content: {
    padding: SPACING.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: 2,
  },
  value: {
    ...FONTS.semiBold,
    fontSize: 18,
  },
});

export default StatusCard;