import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import React, { useState } from 'react';
import { colors } from '../../assets/utils/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

const formatToRupiah = (amount) => {
  return 'Rp. ' + Math.abs(amount).toLocaleString('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
  });
};

export default function TransactionsScreen() {
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const transactions = [
    {
      id: 1,
      title: 'Grocery Shopping',
      amount: -8900.99,
      date: 'Mar 15, 2024',
      category: 'Shopping',
    },
    {
      id: 2,
      title: 'Salary Deposit',
      amount: 3500.00,
      date: 'Mar 14, 2024',
      category: 'Income',
    },
    {
      id: 3,
      title: 'Restaurant Bill',
      amount: -45.50,
      date: 'Mar 13, 2024',
      category: 'Food',
    },
    {
      id: 4,
      title: 'Freelance Payment',
      amount: 850.00,
      date: 'Mar 12, 2024',
      category: 'Income',
    },
  ];

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>March 2024</Text>
      </View>

      <View style={styles.statsContainer}>
        {/*Incomes & Expenses*/}
        <View style={styles.statColumn}>
          <View style={styles.statItemRow}>
            <Ionicons name="arrow-up-circle" size={22} color="#10b981" style={styles.statIcon} />
            <View>
              <Text style={styles.statValue}>{formatToRupiah(totalIncome)}</Text>
              <Text style={styles.statLabel}>Incomes</Text>
            </View>
          </View>
          <View style={styles.statItemRow}>
            <Ionicons name="arrow-down-circle" size={22} color="#ef4444" style={styles.statIcon} />
            <View>
              <Text style={styles.statValue}>{formatToRupiah(totalExpense)}</Text>
              <Text style={styles.statLabel}>Expenses</Text>
            </View>
          </View>
        </View>

        <View style={styles.statDivider} />

        {/* Jumlah Transaksi */}
        <View style={styles.statItemRight}>
          <View style={styles.statCenterContent}>
            <Text style={styles.statValue2}>{transactions.length}</Text>
            <Text style={styles.statLabel}>Jumlah Transaksi</Text>
          </View>
        </View>
      </View>


      {transactions.map((transaction, index) => (
        <Animated.View
          key={transaction.id}
          entering={FadeInDown.delay(index * 100)}
          style={styles.transactionCard}>
          
          {/* Icon + Title + Amount */}
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Ionicons
                name={transaction.amount > 0 ? 'arrow-up-circle' : 'arrow-down-circle'}
                size={22}
                color={transaction.amount > 0 ? '#10b981' : '#ef4444'}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
            </View>

            <Text
              style={[
                styles.transactionAmount,
                { color: transaction.amount > 0 ? '#10b981' : '#ef4444' },
              ]}>
              {transaction.amount > 0 ? '+' : '-'}{formatToRupiah(transaction.amount)}
            </Text>
          </View>

          {/* Footer Info */}
          <View style={styles.transactionFooter}>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{transaction.category}</Text>
            </View>
          </View>

          {/* Expand Button */}
          <Text
            onPress={() => toggleExpand(transaction.id)}
            style={{ color: '#3b82f6', marginTop: 10 }}>
            {expandedId === transaction.id ? 'Lihat lebih sedikit' : 'Lihat detail'}
          </Text>

          {/* Detail Expanded */}
          {expandedId === transaction.id && (
            <View style={styles.detailContainer}>
              <Text style={{ fontSize: 14, color: '#334155' }}>
                📌 Detail transaksi belum tersedia.
              </Text>
              <Text style={{ fontSize: 14, color: '#334155', marginTop: 4 }}>
                Bisa ditambahkan deskripsi, ID pembayaran, atau info tambahan lain.
              </Text>
            </View>
          )}
        </Animated.View>

      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary+10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
  marginHorizontal: 16,
  marginTop: 16,
  padding: 20,
  borderRadius: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
  statColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItemRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statCenterContent: {
    alignItems: 'center',  
    justifyContent: 'center',
  },
  statIcon: {
    marginRight: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statValue2: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 30,
  },

  transactionCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#475569',
  },
  detailContainer: {
    backgroundColor: colors.primary+10,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});