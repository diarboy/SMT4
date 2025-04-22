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
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
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
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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