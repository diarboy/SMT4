// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import { colors } from '../../assets/utils/colors';
// import { fonts } from '../../assets/utils/fonts';
// import { Ionicons } from '@expo/vector-icons';

// export default function Signup() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     if (!name || !email || !password) {
//       Alert.alert('Gagal', 'Semua kolom harus diisi');
//       return;
//     }

//     try {
//       // Ambil daftar user yang sudah ada
//       const existing = await AsyncStorage.getItem('users');
//       const users = existing ? JSON.parse(existing) : [];

//       // Cek apakah email sudah terdaftar
//       const emailUsed = users.find(user => user.email === email);
//       if (emailUsed) {
//         Alert.alert('Gagal', 'Email sudah digunakan');
//         return;
//         }
      
//       // Tambahkan user baru
//       const newUser = { name, email, password };
//       users.push(newUser);
//       await AsyncStorage.setItem('users', JSON.stringify(users));
//       await AsyncStorage.setItem('userData', JSON.stringify({ email, password }));

//       // Simpan token & redirect
//       Alert.alert('Berhasil', 'Pendaftaran berhasil, silakan login');
//       router.replace('/home/login');
//     } catch (err) {
//       Alert.alert('Signup Error', 'Terjadi kesalahan saat mendaftar');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//       <View style={styles.backIconWrapper}>
//         <Ionicons name="arrow-back" size={40} color={colors.primary} />
//       </View>
//       </TouchableOpacity>
      
//       <Text style={styles.title}>Buat Akun</Text>

//       <TextInput
//         placeholder="Nama Lengkap"
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <TextInput
//         placeholder="Password"
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Daftar Sekarang</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.replace('/home/login')}>
//         <Text style={styles.loginText}>
//           Sudah punya akun? <Text style={{ color: colors.primary }}>Login</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'center',
//     backgroundColor: colors.white,
//   },
//   title: {
//     fontSize: 32,
//     fontFamily: fonts.Bold,
//     marginBottom: 30,
//     textAlign: 'center',
//     color: colors.black,
//   },
//   input: {
//     backgroundColor: '#f0f0f0',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     fontSize: 16,
//     fontFamily: fonts.Regular,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: colors.primary,
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: colors.white,
//     fontSize: 18,
//     fontFamily: fonts.Bold,
//     textAlign: 'center',
//   },
//   loginText: {
//     fontSize: 16,
//     fontFamily: fonts.Regular,
//     textAlign: 'center',
//     color: '#333',
//   },

//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 30,
//     zIndex: 10,
//   },

//   backIconWrapper: {
//     backgroundColor: colors.white,
//     borderRadius: 999,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
// });
