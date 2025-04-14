import { View, Text, StyleSheet } from 'react-native';
import TextHeading from '../../../components/TextHeading';

export default function Settings() {
  return (
    <View style={styles.container}>
      <TextHeading>Halaman Logout</TextHeading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
