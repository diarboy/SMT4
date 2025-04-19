import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
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
import { COLORS, FONTS, SPACING, RADIUS } from '@/constants/theme';
import { 
  Menu, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  ChevronDown,
  Filter
} from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import AnimatedLineChart from '@/components/AnimatedLineChart';
import StatusCard from '@/components/StatusCard';
import {
    generateMonthlyIncomeChartData,
    generateMonthlyExpensesChartData,
    generateMonthlyProfitChartData,
    calculateTotalIncome,
    calculateTotalExpenses
} from '../../../assets/utils/mockData';

export default function FinancesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('monthly'); // monthly, weekly, yearly
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(20);
  const headerTitleOpacity = useSharedValue(0);
  
  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get chart data
  const incomeChartData = generateMonthlyIncomeChartData();
  const expensesChartData = generateMonthlyExpensesChartData();
  const profitChartData = generateMonthlyProfitChartData();
  
  // Calculate totals
  const totalIncome = calculateTotalIncome(selectedMonth, selectedYear);
  const totalExpenses = calculateTotalExpenses(selectedMonth, selectedYear);
  const netProfit = totalIncome - totalExpenses;
  
  useEffect(() => {
    // Initial animation
    headerTitleOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    headerTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, []);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
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
  
  const headerTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerTitleOpacity.value,
      transform: [{ translateY: headerTranslateY.value }],
    };
  });
  
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
        <Text style={styles.headerTitle}>Finances</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.white}
          />
        }
      >
        {/* Title and Date Filter */}
        <Animated.View style={[styles.headerSection, headerTitleAnimatedStyle]}>
          <Text style={styles.screenTitle}>Financial Report</Text>
          
          <TouchableOpacity style={styles.dateFilterButton}>
            <Calendar size={16} color={COLORS.white} style={styles.dateIcon} />
            <Text style={styles.dateText}>{monthNames[selectedMonth]} {selectedYear}</Text>
            <ChevronDown size={16} color={COLORS.white} />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'monthly' && styles.activeFilterTab
            ]}
            onPress={() => setActiveFilter('monthly')}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === 'monthly' && styles.activeFilterTabText
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'weekly' && styles.activeFilterTab
            ]}
            onPress={() => setActiveFilter('weekly')}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === 'weekly' && styles.activeFilterTabText
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'yearly' && styles.activeFilterTab
            ]}
            onPress={() => setActiveFilter('yearly')}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === 'yearly' && styles.activeFilterTabText
              ]}
            >
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <StatusCard
            title="Total Income"
            value={`$${totalIncome}`}
            icon={<TrendingUp size={24} color={COLORS.success} />}
            color={COLORS.success}
            delay={200}
            style={{ flex: 1, marginRight: SPACING.s }}
          />
          <StatusCard
            title="Total Expenses"
            value={`$${totalExpenses}`}
            icon={<TrendingDown size={24} color={COLORS.error} />}
            color={COLORS.error}
            delay={300}
            style={{ flex: 1 }}
          />
        </View>
        
        <StatusCard
          title="Net Profit"
          value={`$${netProfit}`}
          icon={<DollarSign size={24} color={COLORS.primary} />}
          color={COLORS.primary}
          delay={400}
          style={{ marginBottom: SPACING.m }}
        />
        
        {/* Income Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Income</Text>
          <AnimatedLineChart
            data={incomeChartData}
            height={200}
            formatYLabel={(value) => `$${value}`}
            delay={500}
          />
        </GlassCard>
        
        {/* Expenses Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Expenses</Text>
          <AnimatedLineChart
            data={expensesChartData}
            height={200}
            formatYLabel={(value) => `$${value}`}
            delay={600}
          />
        </GlassCard>
        
        {/* Profit Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Profit</Text>
          <AnimatedLineChart
            data={profitChartData}
            height={200}
            formatYLabel={(value) => `$${value}`}
            delay={700}
          />
        </GlassCard>
        
        {/* Export/Share buttons could go here */}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? SPACING.m : SPACING.xxl,
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.xxl,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  screenTitle: {
    ...FONTS.bold,
    fontSize: 28,
    color: COLORS.white,
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: RADIUS.m,
  },
  dateIcon: {
    marginRight: SPACING.xxs,
  },
  dateText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
    marginRight: SPACING.xxs,
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: SPACING.m,
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
  summaryRow: {
    flexDirection: 'row',
    marginBottom: SPACING.s,
  },
  chartCard: {
    marginBottom: SPACING.m,
    padding: SPACING.s,
  },
  chartTitle: {
    ...FONTS.semiBold,
    fontSize: 18,
    color: COLORS.darkGray3,
    marginBottom: SPACING.s,
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