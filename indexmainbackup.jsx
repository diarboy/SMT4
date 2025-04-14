import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../assets/utils/colors';
import { useFonts } from 'expo-font';
import { fonts } from '../assets/utils/fonts';

SplashScreen.preventAutoHideAsync();

const Home = () => {
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
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <View style={styles.logocontainer}>
      <Image source={require("../assets/images/react-logo.png")} style={styles.logo}></Image>
      <Text style={styles.titlelogo}>allbibek</Text>
    </View>
      <Image source={require("../assets/images/hero.png")} style={styles.hero}></Image>
      <Text style={styles.title}>Hello! {'\n'}Welcome {'\n'}to MyApp</Text>
      <Text style={styles.headbody}>Kelola semua kebutuhan finansial Anda dengan mudah melalui MyApp.</Text>
      <Text style={styles.body}> Mulai dari belanja online, isi ulang pulsa, bayar tagihan listrik dan air, hingga transfer dana ke sesama pengguna, semua bisa dilakukan langsung dari aplikasi.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButtonWrapper, { backgroundColor: colors.primary },]}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper}>
          <Text style={styles.signupButtonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
  </View>
);
};

const styles = StyleSheet.create({
  logocontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 5,
  },

  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  
  titlelogo: {
    fontSize: 24,
    fontFamily: fonts.Comfort2,
    letterSpacing: 2,
    marginBottom: 0
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 20,
  },
  
  hero: {
    width: 250,
    height: 250,
    marginBottom: -20
  },

  title: {
    fontSize: 48,
    fontFamily: fonts.Bold,
    color: colors.black,
    letterSpacing: 1,
    marginBottom: 20,
    alignSelf: 'left',
    lineHeight: 48,
    paddingHorizontal: 20,
  },

  headbody: {
    fontSize: 20,
    fontFamily: fonts.Heading2,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  body: {
    fontSize: 16,
    fontFamily: fonts.Light,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    width: "80%",
    height: 60,
    borderRadius: 100
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%",
    borderRadius: 98,
  },

  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.Bold,
  },

  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: colors.primary,
  }
});

export default Home