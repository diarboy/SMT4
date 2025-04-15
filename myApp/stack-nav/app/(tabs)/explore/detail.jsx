import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

export default function CardsScreen() {
  const cards = [
    {
      id: 1,
      type: 'Visa',
      number: '•••• •••• •••• 4589',
      balance: 3240.50,
      color: '#6366f1', // indigo
      expiryDate: '12/25',
    },
    {
      id: 2,
      type: 'Mastercard',
      number: '•••• •••• •••• 7890',
      balance: 1850.75,
      color: '#14b8a6', // teal
      expiryDate: '09/26',
    },
    {
      id: 3,
      type: 'Custom',
      number: '•••• •••• •••• 1234',
      balance: 2975.20,
      color: '#f59e0b', // amber / gold
      expiryDate: '07/27',
    },
    {
      id: 4,
      type: 'GPN',
      number: '•••• •••• •••• 5678',
      balance: 4220.00,
      color: '#ef4444', // red
      expiryDate: '03/28',
    },
  ];
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cards</Text>
        <Text style={styles.subtitle}>Manage your payment methods</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Animated.View
            key={card.id}
            entering={FadeInRight.delay(index * 200)}
            style={[styles.card, { backgroundColor: card.color }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>{card.type}</Text>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1611946258676-8ad68a95333b?auto=format&fit=crop&q=80&w=100' }}
                style={styles.chipImage}
              />
            </View>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>Balance</Text>
                <Text style={styles.cardBalance}>${card.balance.toFixed(2)}</Text>
              </View>
              <Text style={styles.cardExpiry}>{card.expiryDate}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <Animated.View
        entering={FadeInDown.delay(400)}
        style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Add Card</Text>
          </BlurView>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Freeze Card</Text>
          </BlurView>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Set Limits</Text>
          </BlurView>
          <BlurView intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Settings</Text>
          </BlurView>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
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
  cardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    width: 300,
    height: 180,
    borderRadius: 20,
    padding: 24,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chipImage: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
  cardNumber: {
    fontSize: 24,
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 20,

  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 12,
    color: '#e0e7ff',
    marginBottom: 4,
  },
  cardBalance: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#ffffff',
  },
  actionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
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
});