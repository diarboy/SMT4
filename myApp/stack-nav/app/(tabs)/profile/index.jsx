import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from 'expo-router';
import { fonts } from '../../../assets/utils/fonts';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}> Ini halaman profil</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('settings')} style={{ borderRadius: 14 }} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 48, marginBottom: 20, fontFamily: fonts.Heading },
});

export default ProfileScreen;