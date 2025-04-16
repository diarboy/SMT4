import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomDrawerContent from '../../../components/DrawerContent'

export default function ProfileLayout() {
  const router = useRouter();

  return (
    <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: true,
      swipeEnabled: true,
      drawerType: 'slide',
      drawerActiveTintColor: '#007aff',
      drawerInactiveTintColor: '#aaa',
      drawerLabelStyle: { marginLeft: 5, fontSize: 18 },
      drawerContentContainerStyle: { paddingTop: 60 },
      swipeEdgeWidth: 100,
    }}
    >

      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Profil Saya',
          title: 'My Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Pengaturan',
          title: 'Settings',
          drawerItemStyle: { marginTop: 10 },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/10' }}
                style={{ width: 35, height: 35, borderRadius: 20, marginRight: 10 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Settings</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <TouchableOpacity onPress={() => router.push('/profile/account')} style={{ marginHorizontal: 5 }}>
              <Ionicons name="person-outline" size={24} color="#007aff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/profile/privacy')} style={{ marginHorizontal: 5 }}>
              <Ionicons name="lock-closed-outline" size={24} color="#007aff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/profile/notifications')} style={{ marginHorizontal: 5 }}>
              <Ionicons name="notifications-outline" size={24} color="#007aff" />
            </TouchableOpacity>
          </View>
          ),
        }}
      />
        
      <Drawer.Screen
        name="test"
        options={{
          drawerLabel: 'Test',
          title: 'test',
          drawerItemStyle: { marginTop: 10 },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
            
          ),
          headerRight: () => (
            <Ionicons
              name="person-circle"
              size={28}
              color="#007aff"
              style={{ marginRight: 15 }}
              onPress={() => {
                alert('Avatar clicked');
              }}
              />
            ),
        }}
      />
      <Drawer.Screen
        name="logout"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Logout',
        }}
      />
    </Drawer>
  );
}
