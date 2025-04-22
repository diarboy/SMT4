import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

const screenWidth = Dimensions.get('window').width - 40;

const AnimatedLineChart = ({
  data,
  height = 220,
  title = '',
  formatYLabel = (value) => `$${value}`,
  delay = 500,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  
  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
      translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
    }, delay);
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <Animated.View style={[styles.chartContainer, animatedStyle]}>
        <LineChart
          data={data}
          width={screenWidth}
          height={height}
          yAxisLabel=""
          yAxisSuffix=""
          formatYLabel={formatYLabel}
          chartConfig={{
            backgroundColor: COLORS.white,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            decimalPlaces: 0,
            color: (opacity = 1) => COLORS.primary,
            labelColor: (opacity = 1) => COLORS.darkGray2,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              stroke: COLORS.primary,
              strokeWidth: '2',
              fill: COLORS.white,
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: COLORS.lightGray2,
            },
          }}
          bezier
          style={styles.chart}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.s,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.darkGray3,
    marginBottom: SPACING.s,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xs,
  },
  chart: {
    borderRadius: 16,
  },
});

export default AnimatedLineChart;