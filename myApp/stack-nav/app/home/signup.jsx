import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../assets/utils/colors';
import { fonts } from '../../assets/utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../assets/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Gagal', 'Semua kolom harus diisi');
      return;
    }
    
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    setLoading(false);

    if (error) {
      Alert.alert('Gagal', error.message);
    } else {
      Alert.alert('Berhasil', 'Akun berhasil dibuat. Selamat datang!');
      await AsyncStorage.setItem('name', data.user?.user_metadata?.name || '');
      await AsyncStorage.setItem('email', data.user?.email || '');
      await AsyncStorage.setItem('token', data.session?.access_token || '');
      await AsyncStorage.setItem('session', JSON.stringify(data.session));

      router.replace('(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <View style={styles.backIconWrapper}>
          <Ionicons name="arrow-back" size={40} color={colors.primary} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Buat Akun</Text>
      <Text style={styles.body}>Daftarkan akun Anda untuk menggunakan layanan ini.</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
        <TextInput
          placeholder="Nama Lengkap"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
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
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#999" />
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Daftar Sekarang'}</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Sudah punya akun? </Text>
        <TouchableOpacity onPress={() => router.replace('/home/login')}>
          <Text style={styles.loginLink}>
            <Text style={{ color: colors.primary }}>Login</Text>
          </Text>
      </TouchableOpacity>
      </View>
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
  body: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    marginBottom: 15,
    textAlign: 'left',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
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
    paddingVertical: 15,
  },
  eyeButton: {
    paddingLeft: 10,
    paddingRight: 15,
  },  
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.Bold,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    textAlign: 'center',
    color: '#333',
  },
  loginLink: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: colors.primary,
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
