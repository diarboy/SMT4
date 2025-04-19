import React, { useEffect, useRef, useState } from 'react';
import {
  Modal, View, Text, StyleSheet, Animated, Easing,
  TouchableOpacity, TextInput, ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../assets/utils/colors';
import { fonts } from '../../assets/utils/fonts';

const RequestModal = ({ visible, onClose }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!recipient) newErrors.recipient = 'Recipient name is required';
    if (!amount || isNaN(amount)) newErrors.amount = 'Valid amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestMoney = () => {
    if (!validate()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Money sent successfully!');
      onClose();
      setAmount('');
      setRecipient('');
      setPaymentMethod('bank');
      setErrors({});
    }, 2000);
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateY.setValue(50);
      opacity.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Request Money</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.label}>Recipient</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter recipient name"
                value={recipient}
                onChangeText={setRecipient}
              />
            </View>
            {errors.recipient && <Text style={styles.error}>{errors.recipient}</Text>}

            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="cash" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={paymentMethod}
                style={styles.picker}
                onValueChange={setPaymentMethod}
              >
                <Picker.Item label="Bank Transfer" value="bank" />
                <Picker.Item label="PayPal" value="paypal" />
                <Picker.Item label="Credit Card" value="credit" />
              </Picker>
            </View>

            <TouchableOpacity
              onPress={handleRequestMoney}
              style={[styles.requestButton, isProcessing && { opacity: 0.7 }]}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.requestButtonText}>Request Money</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: fonts.Bold,
  },
  modalContent: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    marginTop: 12,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 8,
    color: colors.primary,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: fonts.Regular,
    
  },
  pickerWrapper: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  requestButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.Bold,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
    fontFamily: fonts.Regular,
  },
});

export default RequestModal;
