import React, { useState, useRef, useMemo, useCallback } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../assets/utils/fonts';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';
import NotificationModal from '../../components/modals/notification';
import SendMoneyModal from '../../components/modals/sendmoney';
import Background from '../../assets/utils/background';
import RequestModal from '../../components/modals/request';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomSheet from '@/components/modals/BottomSheet';

const Home = () => {
  const { session } = useAuth();
  const router = useRouter();
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [sendMoneyModalVisible, setSendMoneyModalVisible] = useState(false);
  const [requestModalVisible, setRequestModalVisible] = useState(false);

  const toggleNotificationModal = () => {
    setNotificationModalVisible(!notificationModalVisible);
  };

  const toggleSendMoneyModal = () => {
    setSendMoneyModalVisible(!sendMoneyModalVisible);
  };

  const toggleRequestModal = () => {
    setRequestModalVisible(!requestModalVisible);
  };
  
  const userName = session?.user?.user_metadata?.name || 'Dude';
  
  const sheetRef = useRef(null);
  const handleOpenSheet = () => {
    sheetRef.current?.present();
  };

  return (
  <Background>
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar style="auto" translucent backgroundColor="transparent" />
    <ScrollView style={styles.scrollcontainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.logocontainer}>
          <Image source={require("../../assets/images/adaptive-icon.png")} style={styles.logo} />
          <Text style={styles.titlelogo}>allbibek</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => router.push('/profile/account')} style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color={colors.dark} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => router.push('/(tabs)/profile/')} style={styles.iconButton}>
            <Ionicons name="lock-closed-outline" size={24} color="#007aff" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={toggleNotificationModal} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.dark} />
          </TouchableOpacity>
          </View>
      </View>
      
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back👋</Text>
        <Text style={styles.titlename}>{userName}!</Text>
      </View>

      <Animated.View 
        entering={FadeInDown.delay(200)}
        style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>Rp. 12.345,67</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statAmount}>+Rp. 2.450,00</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statAmount}>-Rp. 1.280,00</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInRight.delay(400)}
        style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={toggleSendMoneyModal} intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Send Money</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRequestModal} intensity={20} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity intensity={20} style={styles.actionCard} onPress={handleOpenSheet}>
            <Text style={styles.actionTitle}>Top Up</Text>
          </TouchableOpacity>
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
            <Text style={styles.transactionAmount}>-Rp. 15.000</Text>
          </View>
        ))}
      </Animated.View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.loginButtonWrapper, { backgroundColor: colors.primary },]}
                onPress={() => router.push('/home/login')}>
              <Text style={styles.loginButtonText}>Get</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.loginButtonWrapper}
                onPress={() => router.push('/home/signup')}>
              <Text style={styles.signupButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      <NotificationModal visible={notificationModalVisible} onClose={toggleNotificationModal} />
      <SendMoneyModal visible={sendMoneyModalVisible} onClose={toggleSendMoneyModal} />
      <RequestModal visible={requestModalVisible} onClose={toggleRequestModal} />
      </ScrollView>
      
      <CustomBottomSheet ref={sheetRef}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18 }}>Ini konten di dalam sheet!</Text>
        </View>
      </CustomBottomSheet>
      </SafeAreaView>
    </Background>
  );
};

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginTop: 15,
    },
    logocontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 5,
    },
    logo: {
      width: 50,
      height: 50,
    },
    titlelogo: {
      fontSize: 24,
      fontFamily: fonts.Comfort2,
      letterSpacing: 2,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginHorizontal: 5,
    },
    container: {
      paddingHorizontal: 15,
      marginBottom: 20,
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      padding: 10,
    },
    scrollcontainer: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontFamily: fonts.Manrope,
      color: colors.black,
      letterSpacing: 1,
      marginTop: 10,
      alignSelf: 'left',
      lineHeight: 24,
      paddingHorizontal: 10,
    },
    titlename: {
      fontSize: 32,
      fontFamily: fonts.Manrope,
      color: colors.black,
      letterSpacing: 1,
      alignSelf: 'left',
      // lineHeight: 24,
      paddingHorizontal: 10,
    },
  
    balanceContainer: {
      backgroundColor: '#6366f1',
      borderRadius: 20,
      marginHorizontal: 16,
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
      color: colors.white,
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
      // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: colors.primary + 50,
      borderRadius: 16,
      padding: 20,
      marginRight: 12,
      width: 120,
      height: 60,
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
      backgroundColor: colors.gray,
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      // elevation: 2,
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

    buttonContainer: {
      marginTop: 20,
      marginBottom: 150,
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: colors.primary + 50,
      width: "80%",
      height: 60,
      borderRadius: 100,

    },
    loginButtonWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: "50%",
      borderRadius: 98,
    },
    loginButtonText: {
      color: colors.gray,
      fontSize: 18,
      fontFamily: fonts.Bold,
    },
    signupButtonText: {
      fontSize: 18,
      fontFamily: fonts.Bold,
      color: colors.primary,
    },
});

export default Home