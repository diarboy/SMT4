import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Linking } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../assets/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../../assets/utils/colors';

const ProfileScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [fadeAnim] = useState(new Animated.Value(0));
  const openSocialMedia = (url) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('session');
      await supabase.auth.signOut();
      router.replace('/home/login');
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Ardi Syah</Text>
        <Text style={styles.email}>ardisyah@example.com</Text>
      </Animated.View>

      {/* Tentang Saya */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tentang Saya</Text>
        <Text style={styles.cardText}>
          Desainer grafis dan developer full-stack dengan pengalaman lebih dari 5 tahun di industri teknologi dan desain.
          Senang belajar hal baru dan berbagi pengetahuan kepada sesama.
        </Text>
      </View>

      {/* Keterampilan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Keterampilan</Text>
        <Text style={styles.cardText}>
          - Desain Grafis: Photoshop, Illustrator
          {'\n'}- Pengembangan Web: React, Node.js, Express
          {'\n'}- Pengembangan Aplikasi: React Native, Expo
        </Text>
      </View>

      {/* Pengalaman */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pengalaman</Text>
        <Text style={styles.cardText}>
          - Full Stack Developer di TechLabs (2020 - Sekarang)
          {'\n'}- Desainer Grafis di Creative Studio (2018 - 2020)
        </Text>
      </View>

      {/* Media Sosial */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Media Sosial</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => openSocialMedia('https://facebook.com')}>
            <Ionicons name="logo-facebook" size={30} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia('https://twitter.com')}>
            <Ionicons name="logo-twitter" size={30} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia('https://linkedin.com')}>
            <Ionicons name="logo-linkedin" size={30} color="#0077B5" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tombol */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pengaturan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary+20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#007aff',
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  card: {
    backgroundColor: colors.primary+40,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  buttonsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProfileScreen;
