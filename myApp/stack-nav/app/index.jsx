import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/utils/colors';
import { fonts } from '../assets/utils/fonts';
import Animated, { FadeIn, FadeInDown, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Background from '../assets/utils/background';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const translateX = useSharedValue(0);
  const highlightStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handlePress = (type) => {
    setActiveTab(type);
    if (type === 'login') {
      translateX.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
      router.push('/home/login');
    }, 300);
    } else {
      translateX.value = withTiming(160, { duration: 300 });
      setTimeout(() => {
        router.push('/home/signup');
      }, 300);
    }
  };

  const [activeTab, setActiveTab] = useState('login');
  
  useEffect(() => {
    translateX.value = withTiming(activeTab === 'signup' ? 160 : 0);
  }, [activeTab]);
  
  useEffect(() => {
    const checkLogin = async () => {
      const userToken = await AsyncStorage.getItem('token');
      if (userToken) {
        router.replace('/(tabs)');
      } else {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" translucent backgroundColor="transparent" />
          <View style={styles.container}>
            <View style={styles.logocontainer}>
              <Animated.Image source={require("../assets/images/adaptive-icon.png")} style={styles.logo}
              entering={FadeIn.duration(1000).delay(100)}
              />
              <Animated.Text style={styles.titlelogo}
                entering={FadeIn.duration(1000)}
              > allbibek</Animated.Text>
            </View>
            <Animated.Image source={require("../assets/images/hero.png")} style={styles.hero}
            entering={FadeIn.duration(1000).delay(200)}/>
            <View style={styles.bodycontent}>
              <Animated.View
                entering={FadeInDown.duration(1000).springify().damping(12)}
                style={{ alignItems: 'center' }}
              >
                <Text style={styles.title}>Hello! {'\n'}Welcome {'\n'}to MyApp</Text>
                <Text style={styles.headbody}>Kelola semua kebutuhan finansial Anda dengan mudah melalui MyApp.</Text>
                <Text style={styles.body}>Mulai dari belanja online, isi ulang pulsa, bayar tagihan listrik dan air, hingga transfer dana ke sesama pengguna, semua bisa dilakukan langsung dari aplikasi.</Text>
                </Animated.View>
              <Animated.View style={styles.buttonContainer}
              entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}>
                <Animated.View
                    style={[
                      {
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        backgroundColor: colors.primary,
                        borderRadius: 100,
                        zIndex: -1,
                      },
                      highlightStyle,
                    ]}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.loginButtonWrapper]}
                    onPress={() => handlePress('login')}
                  >
                <Text style={[
                  styles.loginButtonText,
                  { color: activeTab === 'login' ? colors.white : colors.primary }]}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.loginButtonWrapper}
                    onPress={() => handlePress('signup')}
                  >
                <Text style={[
                  styles.signupButtonText,
                  { color: activeTab === 'signup' ? colors.white : colors.primary },]}>SignUp</Text>
                  </TouchableOpacity>
                </Animated.View>
            </View>
          </View>
        </SafeAreaView>
      </Background>
  );
}  

const styles = StyleSheet.create({
  logocontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  logo: {
    width: 60,
    height: 60,
  },
  titlelogo: {
    fontSize: 24,
    fontFamily: fonts.Comfort2,
    letterSpacing: 2,
    marginBottom: 0,
    marginLeft: -10
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    padding: 20,
  },
  hero: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -80,
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
  bodycontent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '90%',
    height: 60,
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',

  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
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
  },
});