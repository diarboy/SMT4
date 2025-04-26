// components/PopupAlert.jsx
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PopupAlert = ({ visible, title, message, type = 'success', onClose }) => {
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  const bgColor = type === 'error' ? '#f44336' : '#4caf50';
  const iconName = type === 'error' ? 'close-circle' : 'checkmark-circle';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          backgroundColor: bgColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={iconName} size={22} color="white" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={20} color="white" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: 12,
    padding: 16,
    zIndex: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 8,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
  },
  message: {
    color: 'white',
    fontSize: 13,
    flexWrap: 'wrap',
  },
  closeIcon: {
    marginLeft: 4,
    marginTop: 2,
  },
});

export default PopupAlert;
