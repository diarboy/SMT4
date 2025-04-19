import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function LottieSplash({ onFinish }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/images/splash-screen.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: width * 0.7,
    height: height * 0.4,
  },
});
