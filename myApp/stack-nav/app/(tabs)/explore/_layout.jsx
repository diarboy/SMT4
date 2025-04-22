// import { Stack } from 'expo-router';

// export default function Layout() {
//     return (
//       <Stack>
//         <Stack.Screen
//             name="index"
//             options={{
//                 title: 'Wakanda',
//                 headerTintColor: 'white',
//                 headerStyle: { backgroundColor: '#0891b2' }
//           }} />
//         <Stack.Screen
//           name="gallery"
//           options={{
//             title: 'Gallery',
//             headerTintColor: 'transparent',
//             headerStyle: { backgroundColor: '#0891b2' }
//         }}
//         />
//         <Stack.Screen
//           name="detail"
//           options={{
//             title: 'Detail Wakanda',
//             headerTintColor: 'white',
//             headerStyle: { backgroundColor: '#0891b2' }
//         }}
//         />
//       </Stack>
//     );
// }

import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomDrawerContent from '../../../components/DrawerContent'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function ExploreLayout() {
  const router = useRouter();

  return (
  <BottomSheetModalProvider>
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
        drawerLabel: 'Home',
        drawerItemStyle: { marginTop: 10 },
        title: 'Home',
        headerShown: false,
        drawerIcon: ({ color, size }) => (
          <Ionicons name="person-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="gallery"
      options={{
        drawerLabel: 'Gallery',
        title: 'Settings',
        headerShown: false,
        drawerItemStyle: { marginTop: 0 },
        drawerIcon: ({ color, size }) => (
          <Ionicons name="image-outline" size={size} color={color} />
        ),
      }}
    />
        
    <Drawer.Screen
      name="detail"
      options={{
        drawerLabel: 'Details',
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
      name="discover"
      options={{
        drawerLabel: 'Discover',
        title: 'Discover',
        headerShown: false,
        drawerItemStyle: { marginTop: 0 },
        drawerIcon: ({ color, size }) => (
          <Ionicons name="compass-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="profile"
      options={{
        drawerLabel: 'Profile',
        title: 'Profile',
        headerShown: false,
        drawerItemStyle: { marginTop: 0 },
        drawerIcon: ({ color, size }) => (
          <Ionicons name="compass-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="favorite"
      options={{
        drawerLabel: 'Favorite',
        title: 'Test',
        headerShown: false,
        drawerItemStyle: { marginTop: 0 },
        drawerIcon: ({ color, size }) => (
          <Ionicons name="compass-outline" size={size} color={color} />
        ),
      }}
    />
      </Drawer>
      </BottomSheetModalProvider>
  );
}
