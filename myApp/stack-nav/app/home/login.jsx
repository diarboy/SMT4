import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../assets/utils/colors';
import { fonts } from '../../assets/utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../assets/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import Background from '@/assets/utils/background';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import PopupAlert from '../../components/modals/PopupAlert';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('success'); // 'error' atau 'success'
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (type, title, message) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showAlert('Login Gagal', error.message);
    } else {
      showAlert('Berhasil', 'Login berhasil');
      
      await AsyncStorage.setItem('session', JSON.stringify(data.session));
      await AsyncStorage.setItem('name', data.user?.user_metadata?.name || '');
      await AsyncStorage.setItem('email', data.user?.email || '');
      await AsyncStorage.setItem('token', data.session?.access_token || '');
      await login(data.session);

      setTimeout(() => {
        router.replace('(tabs)');
      }, 1000);
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error checking session:', error.message);
        return;
      }

      if (data && data.session) {
        router.replace('(tabs)');
      }
    };

    checkSession();
  }, []);

  return (
    <Background>
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar style="auto" translucent backgroundColor="transparent" />      
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
        <View>
          <ArrowLeft size={24} color={COLORS.white} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Login ke MyApp</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#999"
            style={styles.eyeButton}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Masuk'}</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => router.replace('/home/signup')}>
          <Text style={styles.signupLink}>Daftar</Text>
         </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: alertType === 'error' ? '#f44336' : '#4caf50',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() => showAlert('success', 'Berhasil!', 'Kamu menekan tombol alert.')}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Test Alert</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: alertType === 'error' ? '#f44336' : '#4caf50', //f44336 merah, 4caf50 hijau
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() => showAlert('error', 'Error!', 'Kamu menekan tombol alert.')}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Gagal</Text>
          </TouchableOpacity>
          
        </View>

        <PopupAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertVisible(false)}
        />
        
        </SafeAreaView>
      </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 30,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    marginBottom: 30,
    textAlign: 'center',
    color: colors.black,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 60,
  },
  inputIcon: {
    marginRight: 10,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
  eyeButton: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.Bold,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    textAlign: 'center',
    color: '#333',
  },
  signupLink: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: colors.primary,
    marginLeft: 0,
  },
});
