import React, { forwardRef, useRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';

const CustomBottomSheet = forwardRef(({ children, snapPoints = ['50%', '75%'], initialIndex = -1, onClose }, ref) => {
  const sheetRef = useRef(null);
  const points = useMemo(() => snapPoints, [snapPoints]);

  // Methods to open/close sheet
  const present = useCallback((toIndex = 0) => {
    sheetRef.current?.snapToIndex(toIndex);
  }, [initialIndex]);
  const dismiss = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  // Expose handle methods
  useImperativeHandle(ref, () => ({ present, dismiss }), [present, dismiss]);

  // Render a semi-transparent backdrop
  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />,
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={initialIndex}
      snapPoints={points}
      backdropComponent={renderBackdrop}
      backgroundComponent={({ style }) =>
        Platform.OS === 'web' ? (
          <View style={[style, styles.sheetBackground]} />
        ) : (
          <BlurView intensity={80} tint="light" style={[style, styles.sheetBackground]} />
        )
      }
      handleIndicatorStyle={styles.indicator}
      enablePanDownToClose
      onClose={onClose}
    >
      <BottomSheetView style={styles.content}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  sheetBackground: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 24,
    borderRadius: 24
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
  },
});

export default CustomBottomSheet;
