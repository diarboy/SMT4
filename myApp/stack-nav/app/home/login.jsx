import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../assets/utils/colors';
import { fonts } from '../../assets/utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../assets/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        Alert.alert('Login Gagal', error.message);
        setMessage(error.message);

    } else {
      Alert.alert('Berhasil', 'Login berhasil');
      await AsyncStorage.setItem('session', JSON.stringify(data.session))
      await AsyncStorage.setItem('name', data.user?.user_metadata?.name || '');
      await AsyncStorage.setItem('token', data.session?.access_token || '');
      router.replace('(tabs)')
      }
      setLoading(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('(tabs)');
      }
    };
    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
        <View style={styles.backIconWrapper}>
          <Ionicons name="arrow-back" size={40} color={colors.primary} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Login ke MyApp</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Masuk'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/home/signup')}>
        <Text style={styles.signupText}>
          Belum punya akun? <Text style={{ color: colors.primary }}>Daftar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    marginBottom: 30,
    textAlign: 'center',
    color: colors.black,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: fonts.Regular,
    borderRadius: 12,
    marginBottom: 20,
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
  signupText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.Regular,
    textAlign: 'center',
    color: '#333',
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 30,
    zIndex: 10,
  },

  backIconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
