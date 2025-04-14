import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function DetailPage() {
  const router = useRouter();
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Detail Page</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
