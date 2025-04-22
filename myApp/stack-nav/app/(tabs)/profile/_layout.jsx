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
      drawerType: 'slide', //'front', 'back', 'permanent'
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
          drawerItemStyle: { marginTop: 10 },
          title: 'My Profile',
          headerShown: false,
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
          headerShown: false,
          drawerItemStyle: { marginTop: 0 },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
        
      <Drawer.Screen
        name="test"
        options={{
          drawerLabel: 'Test',
          title: 'test',
          drawerItemStyle: { marginTop: 0 },
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
        name="finance"
        options={{
          drawerLabel: 'Finance',
          title: 'Finance',
          headerShown: false,
          drawerItemStyle: { marginTop: 0 },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="rooms"
        options={{
          drawerLabel: 'Rooms',
          title: 'Rooms',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bed-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="occupants"
        options={{
          drawerLabel: 'Occupants',
          title: 'Occupants',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
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
