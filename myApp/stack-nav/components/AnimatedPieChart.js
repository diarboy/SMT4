import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING } from '@/constants/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

const AnimatedPieChart = ({ 
  data, 
  size = 150, 
  strokeWidth = 20, 
  centerLabel = '',
  centerValue = '',
  delay = 500,
  duration = 1000,
}) => {
  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Animation values
  const animatedValues = data.map(() => useSharedValue(0));
  const centerValueOpacity = useSharedValue(0);
  
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    // Animate each segment in sequence
    animatedValues.forEach((animValue, index) => {
      setTimeout(() => {
        animValue.value = withTiming(data[index].count / total, {
          duration,
          easing: Easing.out(Easing.cubic),
        });
      }, delay + index * 200);
    });
    
    // Animate center value
    setTimeout(() => {
      centerValueOpacity.value = withTiming(1, { duration: 800 });
    }, delay + data.length * 200);
  }, [data]);
  
  // Calculate path for each segment
  const getPath = (index, progress) => {
    // Animation logic for pie segments
    const startAngle = data.slice(0, index).reduce(
      (sum, item) => sum + (item.count / total) * 2 * Math.PI, 
      0
    );
    
    const endAngle = startAngle + (data[index].count / total) * progress * 2 * Math.PI;
    
    const x1 = radius * Math.sin(startAngle);
    const y1 = -radius * Math.cos(startAngle);
    const x2 = radius * Math.sin(endAngle);
    const y2 = -radius * Math.cos(endAngle);
    
    // Determine whether to draw the large or small arc
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L 0 0`,
      `L ${x1} ${y1}`,
      'Z'
    ].join(' ');
    
    return pathData;
  };
  
  const animatedCenterProps = useAnimatedProps(() => {
    return {
      opacity: centerValueOpacity.value,
    };
  });
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`-${size/2} -${size/2} ${size} ${size}`}>
        <G>
          {data.map((item, index) => {
            const animatedPathProps = useAnimatedProps(() => {
              return {
                d: getPath(index, animatedValues[index].value),
              };
            });
            
            return (
              <AnimatedPath
                key={index}
                animatedProps={animatedPathProps}
                fill={item.color}
              />
            );
          })}
          
          {/* Center circle for cutout effect */}
          <Circle r={radius - strokeWidth} fill="white" opacity={0.9} />
          
          {/* Center text */}
          <SvgText
            x="0"
            y="-10"
            fontSize="14"
            fontWeight="normal"
            textAnchor="middle"
            fill={COLORS.darkGray2}
          >
            {centerLabel}
          </SvgText>
          
          <AnimatedSvgText
            x="0"
            y="15"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill={COLORS.primary}
            animatedProps={animatedCenterProps}
          >
            {centerValue}
          </AnimatedSvgText>
        </G>
      </Svg>
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name} ({item.count})</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    marginTop: SPACING.m,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxs,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xxs,
  },
  legendText: {
    ...FONTS.body2,
    color: COLORS.darkGray2,
  },
});

export default AnimatedPieChart;