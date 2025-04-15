import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Settings, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../assets/lib/supabase';

export default function SettingScreen() {
  
  const menuItems = [
    {
      id: 1,
      icon: <Settings size={24} color="#475569" />,
      title: 'Account Settings',
      subtitle: 'Manage your account preferences',
    },
    {
      id: 2,
      icon: <CreditCard size={24} color="#475569" />,
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
    },
    {
      id: 3,
      icon: <Bell size={24} color="#475569" />,
      title: 'Notifications',
      subtitle: 'Customize your alerts',
    },
    {
      id: 4,
      icon: <Shield size={24} color="#475569" />,
      title: 'Security',
      subtitle: 'Protect your account',
    },
    {
      id: 5,
      icon: <HelpCircle size={24} color="#475569" />,
      title: 'Help & Support',
      subtitle: 'Get assistance',
    },
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('session');
  
    const { error } = await supabase.auth.signOut(); 
  
    if (error) {
      console.error('Error logging out from Supabase:', error.message);
    } else {
      router.replace('/home/login');
    }
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <BlurView intensity={20} style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name ? `${name}`: 'John Doe'}</Text>
            <Text style={styles.email}>{email ? email : 'john.doe@example.com'}</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified Account</Text>
            </View>
          </View>
        </BlurView>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>$12,450</Text>
          <Text style={styles.statLabel}>Total Balance</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 100)}
          >
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>{item.icon}</View>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text> 
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});