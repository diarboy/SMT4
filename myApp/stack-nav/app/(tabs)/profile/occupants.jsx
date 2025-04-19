import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  TextInput,
  RefreshControl,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '@/constants/theme';
import { ArrowLeft, Menu, Search, Plus, Filter } from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import OccupantCard from '@/components/OccupantCard';
import { occupants, rooms } from '../../../assets/utils/mockData';

export default function OccupantsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, active, former
  const [filteredOccupants, setFilteredOccupants] = useState(occupants);
  const navigation = useNavigation();
  
  const headerOpacity = useSharedValue(0);
  const searchBarTranslateY = useSharedValue(20);
  const searchBarOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Initial animation
    searchBarOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    searchBarTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
    
    // Apply filters
    applyFilters();
  }, [searchQuery, activeFilter]);
  
  const applyFilters = () => {
    let filtered = [...occupants];
    
    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(occupant => occupant.status === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(occupant => 
        occupant.name.toLowerCase().includes(query) || 
        occupant.phone.includes(query) ||
        (occupant.email && occupant.email.toLowerCase().includes(query))
      );
    }
    
    setFilteredOccupants(filtered);
  };
  
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 10 && !isScrolled) {
      headerOpacity.value = withTiming(1, { duration: 300 });
      setIsScrolled(true);
    } else if (scrollY <= 10 && isScrolled) {
      headerOpacity.value = withTiming(0, { duration: 300 });
      setIsScrolled(false);
    }
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });
  
  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: searchBarOpacity.value,
      transform: [{ translateY: searchBarTranslateY.value }],
    };
  });
  
  const renderOccupantCard = ({ item, index }) => {
    const room = rooms.find(r => r.id === item.roomId);
    return (
      <OccupantCard
        name={item.name}
        phone={item.phone}
        roomName={room ? room.name : null}
        entryDate={item.entryDate}
        status={item.status}
        image={item.image}
        onPress={() => {}}
        delay={100 + index * 50}
      />
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.goBack()}>
        <ArrowLeft size={24} color={COLORS.white} />
      </TouchableOpacity>
        <Text style={styles.headerTitle}>Occupants</Text>
        <TouchableOpacity style={styles.menuButton}
          >
          <Menu size={24} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
      
      <View style={styles.contentContainer}>
        {/* Search and Filter Bar */}
        <Animated.View style={[styles.searchContainer, searchBarAnimatedStyle]}>
          <View style={styles.titleRow}>
            <Text style={styles.screenTitle}>Occupants</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={22} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <GlassCard style={styles.searchCard}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={COLORS.gray} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search occupants..."
                placeholderTextColor={COLORS.gray}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </GlassCard>
          
          {/* Filter Tabs */}
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[
                styles.filterTab,
                activeFilter === 'all' && styles.activeFilterTab
              ]}
              onPress={() => setActiveFilter('all')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === 'all' && styles.activeFilterTabText
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterTab,
                activeFilter === 'active' && styles.activeFilterTab
              ]}
              onPress={() => setActiveFilter('active')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === 'active' && styles.activeFilterTabText
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterTab,
                activeFilter === 'former' && styles.activeFilterTab
              ]}
              onPress={() => setActiveFilter('former')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === 'former' && styles.activeFilterTabText
                ]}
              >
                Former
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Occupants List */}
        <FlatList
          data={filteredOccupants}
          renderItem={renderOccupantCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.occupantsList}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.white}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No occupants found.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray1,
  },
  gradientBackground: {
      ...StyleSheet.absoluteFillObject,
      height: 290,
      borderBottomLeftRadius: 14,
      borderBottomRightRadius: 14,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : SPACING.s,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? SPACING.m : SPACING.l,
  },
  searchContainer: {
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.s,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  screenTitle: {
    ...FONTS.bold,
    fontSize: 48,
    color: COLORS.white,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCard: {
    padding: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s,
  },
  searchIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    height: 44,
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.darkGray3,
  },
  filterTabs: {
    flexDirection: 'row',
    marginTop: SPACING.s,
    marginBottom: SPACING.s,
  },
  filterTab: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    marginRight: SPACING.s,
    borderRadius: RADIUS.m,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeFilterTab: {
    backgroundColor: COLORS.white,
  },
  filterTabText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
  },
  activeFilterTabText: {
    color: COLORS.primary,
  },
  occupantsList: {
    paddingHorizontal: SPACING.m,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxl,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.darkGray2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});