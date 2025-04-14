import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/utils/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setIsReady(true);
    };

    if (fontsLoaded) {
      checkLogin().finally(() => SplashScreen.hideAsync());
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? '(tabs)' : 'index'}
    />
  );
}