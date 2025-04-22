import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, Heart } from 'lucide-react-native';
import Animated, { FadeOut, Layout, SlideInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Favorite item component
const FavoriteItem = ({ item, onRemove }) => {
  return (
    <Animated.View 
      layout={Layout.springify()}
      entering={SlideInRight.duration(400)}
      exiting={FadeOut.duration(300)}
      style={styles.favoriteItem}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Trash2 size={18} color="#FF3B30" />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Empty state component
const EmptyState = () => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Heart size={60} color="#CCCCCC" />
      </View>
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptyDescription}>
        Items you like will appear here. Start browsing and add some favorites!
      </Text>
    </View>
  );
};

export default function FavoritesScreen() {
  // Sample favorite items
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Marble Coffee Table',
      description: 'Modern coffee table with marble top',
      price: '$249.99',
      imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'
    },
    {
      id: 2,
      title: 'Reading Chair',
      description: 'Comfortable armchair for reading',
      price: '$199.99',
      imageUrl: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg'
    },
    {
      id: 3,
      title: 'Ceramic Planter',
      description: 'Handmade ceramic planter for indoor plants',
      price: '$59.99',
      imageUrl: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg'
    },
    {
      id: 4,
      title: 'Marble Coffee Table',
      description: 'Modern coffee table with marble top',
      price: '$249.99',
      imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'
    },
    {
      id: 5,
      title: 'Reading Chair',
      description: 'Comfortable armchair for reading',
      price: '$199.99',
      imageUrl: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg'
    },
    {
      id: 6,
      title: 'Ceramic Planter',
      description: 'Handmade ceramic planter for indoor plants',
      price: '$59.99',
      imageUrl: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg'
    }
  ]);
  
  // Remove item from favorites
  const removeFromFavorites = (id) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        {favorites.length > 0 && (
          <Text style={styles.favoriteCount}>{favorites.length} items</Text>
        )}
      </View>
   
      {/* Favorites list */}
      {favorites.length > 0 ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {favorites.map(item => (
            <FavoriteItem 
              key={item.id} 
              item={item} 
              onRemove={removeFromFavorites} 
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingBottom: 70,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  favoriteCount: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#007AFF',
    marginTop: 4,
  },
  removeButton: {
    padding: 16,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
});