import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Explore = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Button
        title="Go to Detail"
        onPress={() => router.push('/explore/detail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default Explore;
