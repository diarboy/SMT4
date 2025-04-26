import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const CustomAlert = ({ visible, title, message, type = 'success', onClose }) => {
  const icon = type === 'error' ? 'close-circle' : 'checkmark-circle';
  const iconColor = type === 'error' ? '#ff4d4d' : '#4BB543';

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Ionicons name={icon} size={48} color={iconColor} style={{ marginBottom: 10 }} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: iconColor }]} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomAlert;
