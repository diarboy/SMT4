import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/utils/colors';
import { AuthProvider } from '../context/AuthContext';
import LottieSplash from './home/splash';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLottie, setShowLottie] = useState(true);

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Italic': require('../assets/fonts/Inter-Italic.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
    'Comfortaa-Light': require('../assets/fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
    'Manrope-Light': require('../assets/fonts/Manrope-Light.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
      setTimeout(() => {
        setShowLottie(false);
        setIsReady(true);
        SplashScreen.hideAsync();
      }, 3000);
    };

    if (fontsLoaded) {
      checkLogin().finally(() => SplashScreen.hideAsync());
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !isReady) {
    if (showLottie) {
      return <LottieSplash onFinish={() => {
        setShowLottie(false);
        setIsReady(true);
        SplashScreen.hideAsync();
      }} />;
    }
    return null;
  }
  
  return (
      <AuthProvider>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? '(tabs)' : 'index'}
          />
      </AuthProvider>
  );
}