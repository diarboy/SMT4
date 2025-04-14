import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from '../../../components/DrawerContent'

export default function ProfileLayout() {
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
          title: 'ABOY',
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
