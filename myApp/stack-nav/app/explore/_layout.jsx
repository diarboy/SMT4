import { Stack } from 'expo-router';

export default function Layout() {
    return (
      <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'Wakanda',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0891b2' }
            }} />
        <Stack.Screen
          name="detail"
          options={{
            title: 'Detail Wakanda',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0891b2' }
        }}
        />
      </Stack>
    );
  }