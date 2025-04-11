import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi password tidak cocok');
      return;
    }

    Alert.alert('Success', 'Akun berhasil dibuat');
    navigation.navigate('SignIn'); // Arahkan ke halaman login setelah signup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Daftar" onPress={handleSignUp} />
      <Button
        title="Sudah Punya Akun? Masuk di sini"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SignUp;