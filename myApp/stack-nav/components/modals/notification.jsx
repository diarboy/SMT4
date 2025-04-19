import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../assets/utils/colors';
import { fonts } from '../../assets/utils/fonts';

const NotificationModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {Array.from({ length: 20 }, (_, i) => (
              <View key={i} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>Notifikasi #{i + 1}</Text>
                <Text style={styles.notificationText}>Ini isi notifikasi panjang yang bisa di-scroll ke bawah.</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent', // hilangkan overlay gelap
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50, // atur jarak dari atas
    paddingRight: 16, // jarak dari kanan
  },
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)', // semi transparan
    borderRadius: 12,
    padding: 12,
    width: 280,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.Bold,
  },
  modalContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationText: {
    fontSize: 14,
    color: '#555',
  },
});
