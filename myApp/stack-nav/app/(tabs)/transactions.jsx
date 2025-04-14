import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TextBody from '../../components/TextBody';
import TextHeading from '../../components/TextHeading';

const transactions = () => {
  return (
    <View style={styles.container}>
        <TextHeading>Halaman Transaksi</TextHeading>
    </View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default transactions