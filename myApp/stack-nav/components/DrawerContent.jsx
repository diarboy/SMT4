import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CustomDrawerContent = (props) => {
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Ardi Syah</Text>
      </View>

      {/* List item */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

              {/* Navigasi Tab */}
              <DrawerItem
          label="Home"
          onPress={() => router.push('/')}
          icon={({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Explore"
          onPress={() => router.push('/explore')}
          icon={({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Transactions"
          onPress={() => router.push('/transactions')}
          icon={({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          )}
        />

      {/* Logout */}
      <DrawerItem
        label="Keluar"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate('logout');
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    fontSize: 49,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;
