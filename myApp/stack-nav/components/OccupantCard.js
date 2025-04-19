import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, RADIUS } from '@/constants/theme';
import { Building2, Phone } from 'lucide-react-native';
import { format, parseISO } from 'date-fns';
import { BlurView } from 'expo-blur';

const OccupantCard = ({
  name,
  phone,
  roomName,
  entryDate,
  status,
  image,
  onPress,
  delay = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(1);
  
  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
      translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
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
  
  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  
  // Format the entry date
  const formattedEntryDate = format(parseISO(entryDate), 'MMM d, yyyy');
  
  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.card}>
          <View style={styles.leftContent}>
            <Image source={{ uri: image }} style={styles.image} />
            
            <View style={styles.statusBadge}>
              <BlurView intensity={80} tint="light" style={styles.statusBlur}>
                <Text style={[
                  styles.statusText, 
                  { color: status === 'active' ? COLORS.success : COLORS.gray }
                ]}>
                  {status === 'active' ? 'Active' : 'Former'}
                </Text>
              </BlurView>
            </View>
          </View>
          
          <View style={styles.rightContent}>
            <Text style={styles.name}>{name}</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Phone size={12} color={COLORS.gray} />
              </View>
              <Text style={styles.infoText}>{phone}</Text>
            </View>
            
            {roomName && (
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Building2 size={12} color={COLORS.gray} />
                </View>
                <Text style={styles.infoText}>{roomName}</Text>
              </View>
            )}
            
            <View style={styles.entryContainer}>
              <Text style={styles.entryLabel}>Entry Date:</Text>
              <Text style={styles.entryDate}>{formattedEntryDate}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.s,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.m,
    flexDirection: 'row',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    padding: SPACING.s,
  },
  leftContent: {
    position: 'relative',
    marginRight: SPACING.s,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.s,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -25,
    borderRadius: RADIUS.s,
    overflow: 'hidden',
    width: 50,
  },
  statusBlur: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: RADIUS.s,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: 10,
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...FONTS.semiBold,
    fontSize: 16,
    color: COLORS.darkGray3,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  infoText: {
    ...FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGray2,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  entryLabel: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginRight: 4,
  },
  entryDate: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.darkGray2,
  },
});

export default OccupantCard;