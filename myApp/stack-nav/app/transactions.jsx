import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const transactions = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Halaman Transaksi</Text>
    </View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
title: { fontSize: 24, marginBottom: 20 },
});

export default transactions