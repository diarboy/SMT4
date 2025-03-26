// Import Dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Component
const Login = () => {
    return (
      <View>
        <Text style={styles.text}>Halaman Login</Text>
    </View>
    );
};
// Styling
const styles = StyleSheet.create({
    text: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: 'bold',

    },
});
// Export
export default Login;
