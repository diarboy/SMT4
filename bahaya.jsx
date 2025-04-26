import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
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
import { Building2, DoorClosed, CreditCard, TriangleAlert as AlertTriangle, Menu, TrendingUp } from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import StatusCard from '@/components/StatusCard';
import AnimatedPieChart from '@/components/AnimatedPieChart';
import PaymentReminderCard from '@/components/PaymentReminderCard';
import AnimatedLineChart from '@/components/AnimatedLineChart';
import {
  rooms,
  occupants,
  payments,
  expenses,
  getOccupancyRate,
  getCurrentMonthPaymentStatus,
  generateOccupancyChartData,
  generatePaymentStatusChartData,
  generateMonthlyIncomeChartData,
  calculateTotalIncome,
} from '@/assets/utils/mockData';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerOpacity = useSharedValue(0);
  const welcomeTranslateY = useSharedValue(20);
  const welcomeOpacity = useSharedValue(0);

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get occupancy data
  const occupancyData = getOccupancyRate();
  const occupancyChartData = generateOccupancyChartData();

  // Get payment status data
  const paymentStatusData = getCurrentMonthPaymentStatus();
  const paymentChartData = generatePaymentStatusChartData();

  // Get monthly income data
  const monthlyIncomeChartData = generateMonthlyIncomeChartData();

  // Calculate total income for current month
  const totalIncome = calculateTotalIncome(currentMonth, currentYear);

  // Find unpaid rooms for reminders
  const unpaidRooms = rooms
    .filter(room => room.status === 'occupied')
    .filter(room => {
      const roomPayments = payments.filter(
        payment => 
          payment.roomId === room.id && 
          new Date(payment.date).getMonth() === currentMonth &&
          new Date(payment.date).getFullYear() === currentYear
      );
      return roomPayments.length === 0 || roomPayments.some(payment => payment.status === 'overdue');
    })
    .map(room => {
      const occupant = occupants.find(o => o.id === room.occupant);
      return {
        id: room.id,
        roomName: room.name,
        occupantName: occupant ? occupant.name : 'Unknown',
        daysOverdue: Math.floor(Math.random() * 10) + 1, // Random days overdue for demo
        amount: room.monthlyRate,
      };
    });

  useEffect(() => {
    welcomeOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    welcomeTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, []);

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

  const welcomeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: welcomeOpacity.value,
      transform: [{ translateY: welcomeTranslateY.value }],
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
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.white}
          />
        }
      >
        {/* Welcome section */}
        <Animated.View style={[styles.welcomeSection, welcomeAnimatedStyle]}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Alex Thompson</Text>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Menu size={24} color={COLORS.white} />
          </TouchableOpacity>
        </Animated.View>

        {/* Stats cards */}
        <View style={styles.statsRow}>
          <StatusCard
            title="Total Rooms"
            value={occupancyData.totalRooms.toString()}
            icon={<Building2 size={24} color={COLORS.primary} />}
            color={COLORS.primary}
            delay={200}
          />
          <StatusCard
            title="Occupied"
            value={occupancyData.occupiedRooms.toString()}
            icon={<DoorClosed size={24} color={COLORS.secondary} />}
            color={COLORS.secondary}
            delay={300}
          />
        </View>

        <View style={styles.statsRow}>
          <StatusCard
            title="Monthly Income"
            value={`$${totalIncome}`}
            icon={<CreditCard size={24} color={COLORS.success} />}
            color={COLORS.success}
            delay={400}
          />
          <StatusCard
            title="Unpaid"
            value={paymentStatusData.unpaidCount.toString()}
            icon={<AlertTriangle size={24} color={COLORS.warning} />}
            color={COLORS.warning}
            delay={500}
          />
        </View>

        {/* Occupancy Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Room Occupancy</Text>
          <AnimatedPieChart
            data={occupancyChartData}
            size={180}
            centerLabel="Occupancy"
            centerValue={`${Math.round(occupancyData.rate)}%`}
            delay={600}
          />
        </GlassCard>

        {/* Payment Reminders */}
        {unpaidRooms.length > 0 && (
          <View style={styles.remindersSection}>
            <Text style={styles.sectionTitle}>Payment Reminders</Text>
            {unpaidRooms.map((room, index) => (
              <PaymentReminderCard
                key={room.id}
                roomName={room.roomName}
                occupantName={room.occupantName}
                daysOverdue={room.daysOverdue}
                amount={room.amount}
                onPress={() => {}}
                delay={700 + index * 100}
              />
            ))}
          </View>
        )}

        {/* Monthly Income Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Income</Text>
          <AnimatedLineChart
            data={monthlyIncomeChartData}
            height={220}
            delay={800}
          />
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Financial Report</Text>
            <TrendingUp size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </GlassCard>
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
    height: 260,
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
    paddingTop: Platform.OS === 'ios' ? SPACING.l : SPACING.xxl,
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.xxl,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  welcomeText: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  nameText: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.white,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  chartCard: {
    marginTop: SPACING.m,
    marginBottom: SPACING.m,
    padding: SPACING.s,
  },
  chartTitle: {
    ...FONTS.semiBold,
    fontSize: 18,
    color: COLORS.darkGray3,
    marginBottom: SPACING.s,
  },
  remindersSection: {
    marginBottom: SPACING.m,
  },
  sectionTitle: {
    ...FONTS.semiBold,
    fontSize: 18,
    color: COLORS.darkGray3,
    marginBottom: SPACING.s,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.s,
    paddingVertical: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray2,
  },
  viewDetailsText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    marginRight: SPACING.xxs,
  },
});