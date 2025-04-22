import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useCallback,
  } from 'react';
  import {
    View,
    StyleSheet,
    Modal,
    Platform,
    Dimensions,
    Pressable,
  } from 'react-native';
  import { BlurView } from 'expo-blur';
  import {
    GestureDetector,
    Gesture,
  } from 'react-native-gesture-handler';
  import Animated, {
    useSharedValue,
    withSpring,
    withTiming,
    useAnimatedStyle,
    runOnJS,
  } from 'react-native-reanimated';
  
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const SNAP_POINTS = {
    FULL: 0,
    THREE_QUARTER: SCREEN_HEIGHT * 0.25,
    HIDDEN: SCREEN_HEIGHT,
  };
  
  const CustomModal = forwardRef(({ children }, ref) => {
    const [visible, setVisible] = useState(false);
    const translateY = useSharedValue(SNAP_POINTS.HIDDEN);
    const backdropOpacity = useSharedValue(1);
  
    const show = () => {
      setVisible(true);
      backdropOpacity.value = 0;
      requestAnimationFrame(() => {
        backdropOpacity.value = withTiming(1, { duration: 200 });
        translateY.value = withSpring(SNAP_POINTS.THREE_QUARTER, { damping: 30 });
      });
    };
  
    const hide = useCallback(() => {
      backdropOpacity.value = withTiming(0, { duration: 150 });
      translateY.value = withSpring(SNAP_POINTS.HIDDEN, { damping: 30 }, () => {
        runOnJS(setVisible)(false);
        backdropOpacity.value = 1; // reset buat show berikutnya
      });
    }, []);
  
    useImperativeHandle(ref, () => ({
      present: show,
      dismiss: hide,
    }));
  
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        if (e.translationY > 0) {
          translateY.value = SNAP_POINTS.THREE_QUARTER + e.translationY;
        }
      })
      .onEnd((e) => {
        if (e.translationY > 80) {
          hide();
        } else {
          translateY.value = withSpring(SNAP_POINTS.THREE_QUARTER, { damping: 30 });
        }
      });
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));
  
    const backdropAnimatedStyle = useAnimatedStyle(() => ({
      opacity: backdropOpacity.value,
    }));
  
    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={hide}
        animationType="none"
      >
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={hide} />
        </Animated.View>
  
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            {Platform.OS === 'web' ? (
              <View style={styles.modalBackground}>
                <SwipeBar />
                {children}
              </View>
            ) : (
              <BlurView intensity={80} tint="light" style={styles.modalBackground}>
                <SwipeBar />
                {children}
              </BlurView>
            )}
          </Animated.View>
        </GestureDetector>
      </Modal>
    );
  });
  
  const SwipeBar = () => (
    <View style={styles.swipeBarContainer}>
      <View style={styles.swipeBar} />
    </View>
  );
  
  const styles = StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    modalBackground: {
      backgroundColor: 'white',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      minHeight: SCREEN_HEIGHT * 0.5,
    },
    swipeBarContainer: {
      alignItems: 'center',
      marginBottom: 12,
    },
    swipeBar: {
      width: 40,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: '#ccc',
    },
  });
  
  export default CustomModal;
  