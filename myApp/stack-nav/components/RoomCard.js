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
import { User, DoorClosed } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const RoomCard = ({
  name,
  status,
  occupantName,
  monthlyRate,
  amenities,
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
  
  const isOccupied = status === 'occupied';
  
  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <View style={styles.card}>
          <Image source={{ uri: image }} style={styles.image} />
          
          <View style={styles.overlay}>
            <BlurView intensity={20} tint="dark" style={styles.blurOverlay} />
          </View>
          
          <View style={styles.statusBadge}>
            <BlurView intensity={80} tint="light" style={styles.statusBlur}>
              <Text style={[
                styles.statusText, 
                { color: isOccupied ? COLORS.primary : COLORS.success }
              ]}>
                {isOccupied ? 'Occupied' : 'Vacant'}
              </Text>
            </BlurView>
          </View>
          
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.rate}>${monthlyRate}/month</Text>
              </View>
            </View>
            
            {isOccupied && (
              <View style={styles.occupantContainer}>
                <View style={styles.occupantIcon}>
                  <User size={14} color={COLORS.white} />
                </View>
                <Text style={styles.occupantName}>{occupantName}</Text>
              </View>
            )}
            
            <View style={styles.amenitiesContainer}>
              {amenities.slice(0, 3).map((amenity, index) => (
                <View key={index} style={styles.amenityBadge}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
              {amenities.length > 3 && (
                <View style={styles.amenityBadge}>
                  <Text style={styles.amenityText}>+{amenities.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: SPACING.m,
  },
  pressable: {
    borderRadius: RADIUS.m,
    overflow: 'hidden',
  },
  card: {
    borderRadius: RADIUS.m,
    overflow: 'hidden',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  statusBadge: {
    position: 'absolute',
    top: SPACING.s,
    right: SPACING.s,
    borderRadius: RADIUS.m,
    overflow: 'hidden',
  },
  statusBlur: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.m,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: 12,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.s,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xxs,
  },
  name: {
    ...FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  rate: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  occupantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  occupantIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  occupantName: {
    ...FONTS.medium,
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.9,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.xxs,
  },
  amenityBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.s,
    marginRight: 6,
    marginBottom: 6,
  },
  amenityText: {
    ...FONTS.regular,
    fontSize: 10,
    color: COLORS.white,
  },
});

export default RoomCard;