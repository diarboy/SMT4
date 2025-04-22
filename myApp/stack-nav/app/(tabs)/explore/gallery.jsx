import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const images = [
  { id: 1, url: 'https://picsum.photos/id/1011/400/300' },
  { id: 2, url: 'https://picsum.photos/id/1020/400/300' },
  { id: 3, url: 'https://picsum.photos/id/1025/400/300' },
  { id: 4, url: 'https://picsum.photos/id/1031/400/300' },
  { id: 5, url: 'https://picsum.photos/id/1043/400/300' },
  { id: 6, url: 'https://picsum.photos/id/1060/400/300' },
  { id: 7, url: 'https://picsum.photos/id/1069/400/300' },
  { id: 8, url: 'https://picsum.photos/id/1074/400/300' },
  { id: 9, url: 'https://picsum.photos/id/1084/400/300' },
  { id: 10, url: 'https://picsum.photos/id/1081/400/300' },
  { id: 11, url: 'https://picsum.photos/id/1082/400/300' },
  { id: 12, url: 'https://picsum.photos/id/1040/400/300' },
  { id: 13, url: 'https://picsum.photos/id/1080/400/300' },
  { id: 14, url: 'https://picsum.photos/id/1079/400/300' },
  { id: 15, url: 'https://picsum.photos/id/1076/400/300' },
  { id: 16, url: 'https://picsum.photos/id/1068/400/300' },
  { id: 17, url: 'https://picsum.photos/id/1050/400/300' },
  { id: 18, url: 'https://picsum.photos/id/1033/400/300' },
  { id: 19, url: 'https://picsum.photos/id/1024/400/300' },
  { id: 20, url: 'https://picsum.photos/id/1015/400/300' },
];

const Explore = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.scrollContainer}>
          
      <View style={styles.header}>
        <Text style={styles.title}>Gallery</Text>
      </View>

      <View style={styles.grid}>
        {images.map((image) => (
          <TouchableOpacity key={image.id} style={styles.imageContainer}>
            <Image
              source={{ uri: image.url }}
              style={styles.image}
              resizeMode="cover"
              onError={(e) => {
                console.log(`❌ Gagal memuat gambar ID ${image.id}`, e.nativeEvent.error);
              }}
              defaultSource={require('../../../assets/images/react-logo.png')}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  imageContainer: {
    width: '50%',
    padding: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  exploreContainer: {
    padding: 20,
    marginBottom: 100,
    borderRadius: 12,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#8DFF30",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    margin: 15,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default Explore;
