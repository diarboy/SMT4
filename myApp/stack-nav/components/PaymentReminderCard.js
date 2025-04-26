import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, RADIUS } from '@/constants/theme';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import GlassCard from './GlassCard';

const PaymentReminderCard = ({
  roomName,
  occupantName,
  daysOverdue,
  amount,
  onPress,
  delay = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(20);
  const scale = useSharedValue(1);
  
  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
      translateX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
    }, delay);
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    };
  });
  
  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  
  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <GlassCard style={styles.card}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <AlertTriangle size={20} color={COLORS.warning} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.roomName}>{roomName}</Text>
              <Text style={styles.occupantName}>{occupantName}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.daysOverdue}>
                  {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'} overdue
                </Text>
                <Text style={styles.amount}>${amount}</Text>
              </View>
            </View>
          </View>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.s,
  },
  card: {
    padding: 0,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
  },
  content: {
    padding: SPACING.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.m,
    backgroundColor: `${COLORS.warning}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  textContainer: {
    flex: 1,
  },
  roomName: {
    ...FONTS.medium,
    fontSize: 15,
    color: COLORS.darkGray3,
  },
  occupantName: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.darkGray1,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysOverdue: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.warning,
  },
  amount: {
    ...FONTS.semiBold,
    fontSize: 15,
    color: COLORS.darkGray2,
  },
});

export default PaymentReminderCard;