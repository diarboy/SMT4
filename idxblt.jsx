import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Bell, ChevronDown } from 'lucide-react-native';

// Card component for featured items
const FeatureCard = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.featureCard}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.featureImage}
        resizeMode="cover"
      />
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Card component for items in the grid
const ItemCard = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.itemCard}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const itemWidth = width > 768 ? width / 3 - 24 : (width - 48) / 2;
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Bottom sheet reference
  const bottomSheetModalRef = useRef(null);
  
  // Variables for bottom sheet
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  
  // Callbacks for bottom sheet
  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  
  const handleSheetChanges = useCallback((index) => {
    console.log('Bottom sheet index changed:', index);
  }, []);
  
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );
  
  // Sample data
  const featuredItems = [
    {
      id: 1,
      title: 'Summer Collection',
      subtitle: 'New arrivals for the season',
      imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
    },
    {
      id: 2,
      title: 'Exclusive Deals',
      subtitle: 'Limited time offers',
      imageUrl: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg'
    },
    {
      id: 3,
      title: 'New Releases',
      subtitle: 'Just launched products',
      imageUrl: 'https://images.pexels.com/photos/4452526/pexels-photo-4452526.jpeg'
    }
  ];
  
  const categories = ['All', 'Popular', 'Recent', 'Recommended'];
  
  const items = [
    {
      id: 1,
      title: 'Modern Chair',
      subtitle: '$149.99',
      imageUrl: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg'
    },
    {
      id: 2,
      title: 'Wooden Table',
      subtitle: '$249.99',
      imageUrl: 'https://images.pexels.com/photos/2451264/pexels-photo-2451264.jpeg'
    },
    {
      id: 3,
      title: 'Desk Lamp',
      subtitle: '$59.99',
      imageUrl: 'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg'
    },
    {
      id: 4,
      title: 'Sofa Set',
      subtitle: '$799.99',
      imageUrl: 'https://images.pexels.com/photos/1668860/pexels-photo-1668860.jpeg'
    },
    {
      id: 5,
      title: 'Bookshelf',
      subtitle: '$299.99',
      imageUrl: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg'
    },
    {
      id: 6,
      title: 'Wall Art',
      subtitle: '$129.99',
      imageUrl: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg'
    }
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Welcome back</Text>
          <Text style={styles.headerTitle}>Discover</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Items Carousel */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {featuredItems.map(item => (
              <FeatureCard key={item.id} item={item} />
            ))}
          </ScrollView>
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
        
        {/* Items Grid */}
        <View style={styles.itemsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={openBottomSheet}
            >
              <Text style={styles.filterText}>Filter</Text>
              <ChevronDown size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.itemsGrid}>
            {items.map(item => (
              <Animated.View 
                key={item.id}
                entering={FadeIn.delay(item.id * 100).duration(400)}
                style={[styles.itemCardContainer, { width: itemWidth }]}
              >
                <ItemCard item={item} />
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Sheet */}
      {Platform.OS === 'web' ? (
        <View>
          {/* Simple View that doesn't cause web compatibility issues */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            backgroundComponent={({ style }) => (
              <View style={[style, { backgroundColor: 'white', borderRadius: 24 }]} />
            )}
            handleIndicatorStyle={styles.bottomSheetIndicator}
          >
            <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetTitle}>Filter Options</Text>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                    <Text style={styles.filterOptionText}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>Under $100</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>$100 - $300</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>$300+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Categories</Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                    <Text style={styles.filterOptionText}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>Furniture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>Decor</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>Lighting</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.bottomSheetActions}>
                <TouchableOpacity style={styles.resetButton}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      ) : (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          backgroundComponent={({ style }) => (
            <BlurView
              intensity={80}
              tint="light"
              style={[style, { borderRadius: 24 }]}
            />
          )}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Filter Options</Text>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                  <Text style={styles.filterOptionText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>Under $100</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>$100 - $300</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>$300+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Categories</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                  <Text style={styles.filterOptionText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>Furniture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>Decor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>Lighting</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.bottomSheetActions}>
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  sectionContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginLeft: 24,
    marginBottom: 12,
  },
  featuredContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  featureCard: {
    width: 280,
    height: 160,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  featureTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFF',
  },
  featureSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  categoriesContainer: {
    marginTop: 24,
  },
  categoriesScrollView: {
    paddingHorizontal: 24,
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
  itemsContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#007AFF',
    marginRight: 4,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCardContainer: {
    marginBottom: 16,
  },
  itemCard: {
    borderRadius: 12,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 140,
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
    marginTop: 4,
  },
  bottomSheetIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 24,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#007AFF',
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  bottomSheetActions: {
    flexDirection: 'row',
    marginTop: 24,
  },
  resetButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  applyButton: {
    flex: 2,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFF',
  },
});

//profile

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ShoppingBag, CreditCard, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

// Profile menu item component
const MenuItem = ({ icon, title, subtitle, showSwitch, showChevron, onPress }) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  return (
    <TouchableOpacity 
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.menuIconContainer}>
        {icon}
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch && (
        <Switch
          trackColor={{ false: '#DDDDDD', true: '#4CD964' }}
          thumbColor="#FFFFFF"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}
      {showChevron && <ChevronRight size={20} color="#BBBBBB" />}
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  // Sample user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatarUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          {Platform.OS === 'web' ? (
            <View style={styles.profileCardContent}>
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <BlurView intensity={20} tint="light" style={styles.profileCardBlur}>
              <View style={styles.profileCardContent}>
                <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileEmail}>{user.email}</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          )}
        </View>
        
        {/* Menu sections */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            <MenuItem 
              icon={<ShoppingBag size={20} color="#007AFF" />} 
              title="My Orders" 
              subtitle="View your order history" 
              showChevron 
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem 
              icon={<CreditCard size={20} color="#007AFF" />} 
              title="Payment Methods" 
              showChevron 
              onPress={() => {}}
            />
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            <MenuItem 
              icon={<Bell size={20} color="#FF9500" />} 
              title="Notifications" 
              showSwitch 
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem 
              icon={<HelpCircle size={20} color="#FF9500" />} 
              title="Help & Support" 
              showChevron 
              onPress={() => {}}
            />
          </View>
        </View>
        
        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#FF3B30" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        
        {/* Version info */}
        <Text style={styles.versionText}>App Version 1.0.0</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.7)' : undefined,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileCardBlur: {
    borderRadius: 16,
  },
  profileCardContent: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DDD',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFF',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 24,
    marginBottom: 8,
  },
  menuContainer: {
    marginHorizontal: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 68,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FF3B30',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textAlign: 'center',
  },
});