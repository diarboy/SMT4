import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, X } from 'lucide-react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

// Item card component
const SearchResultCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.resultCard} activeOpacity={0.7}>
      <Image source={{ uri: item.imageUrl }} style={styles.resultImage} resizeMode="cover" />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultDescription}>{item.description}</Text>
        <Text style={styles.resultPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Categories
  const categories = ['All', 'Furniture', 'Decor', 'Lighting', 'Kitchen', 'Bedroom'];
  
  // Sample search results
  const searchResults = [
    {
      id: 1,
      title: 'Modern Dining Table',
      description: 'Contemporary dining table with wooden finish',
      price: '$399.99',
      imageUrl: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg'
    },
    {
      id: 2,
      title: 'Scandinavian Chair',
      description: 'Minimalist design with premium comfort',
      price: '$189.99',
      imageUrl: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg'
    },
    {
      id: 3,
      title: 'Ceramic Vase Set',
      description: 'Set of 3 decorative ceramic vases',
      price: '$79.99',
      imageUrl: 'https://images.pexels.com/photos/1321290/pexels-photo-1321290.jpeg'
    },
    {
      id: 4,
      title: 'Pendant Light',
      description: 'Modern hanging ceiling lamp',
      price: '$129.99',
      imageUrl: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg'
    },
    {
      id: 5,
      title: 'Bookshelf',
      description: 'Open shelf unit with 5 compartments',
      price: '$249.99',
      imageUrl: 'https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg'
    }
  ];
  
  // Handle search input
  const handleSearchInput = (text) => {
    setSearchQuery(text);
    setShowClearButton(text.length > 0);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setShowClearButton(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearchInput}
            placeholderTextColor="#8E8E93"
          />
          {showClearButton && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={16} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollView}
        >
          {categories.map(category => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Search results */}
      <ScrollView
        style={styles.resultsContainer}
        contentContainerStyle={styles.resultsContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultCount}>{searchResults.length} results</Text>
        
        {searchResults.map((item, index) => (
          <Animated.View 
            key={item.id}
            entering={FadeIn.delay(index * 100).duration(400)}
            layout={Layout.springify()}
          >
            <SearchResultCard item={item} />
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesScrollView: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  activeCategoryText: {
    color: '#FFF',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 8,
  },
  resultsContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  resultCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImage: {
    width: 120,
    height: 120,
  },
  resultInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  resultDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
  },
  resultPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#007AFF',
    marginTop: 8,
  },
});