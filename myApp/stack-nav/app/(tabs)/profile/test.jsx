import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const test = () => {
  return (

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeInDown.delay(200)}
        style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$12,345.67</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statAmount}>+$2,450.00</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statAmount}>-$1,280.00</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInRight.delay(400)}
        style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Send Money</Text>
          </BlurView>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Request</Text>
          </BlurView>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Top Up</Text>
          </BlurView>
        </ScrollView>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(600)}
        style={styles.recentTransactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionTitle}>Netflix Subscription</Text>
              <Text style={styles.transactionDate}>Mar 15, 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>-$15.99</Text>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  balanceContainer: {
    backgroundColor: '#6366f1',
    borderRadius: 20,
    margin: 16,
    padding: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceLabel: {
    color: '#e0e7ff',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    color: '#e0e7ff',
    fontSize: 14,
  },
  statAmount: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  quickActionsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginRight: 12,
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  recentTransactionsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});

export default test
