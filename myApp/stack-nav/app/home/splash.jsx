import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LottieSplash({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnimationFinish = () => {
    setTimeout(() => {
      // Fade out selama 500ms
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 5000); // Delay sebelum mulai fade-out
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LottieView
        source={require('../../assets/images/bghouse.json')}
        autoPlay
        loop={true}
        speed={0.5}
        onAnimationFinish={handleAnimationFinish}
        style={styles.lottie}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
