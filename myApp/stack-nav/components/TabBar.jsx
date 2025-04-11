import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import TabBarButton from './TabBarButton'


const TabBar = ({ state, descriptors, navigation }) => {
    const primaryColor = '#0891b2';
    const altColor = '#737373';

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
                      : route.name;
          
          if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : altColor}
            label={label}
            />
        )
        
        // return (

        //     <TouchableOpacity
        //     key={route.name}
        //     style={styles.tabbarItem}
        //     accessibilityRole="button"
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     >
        //     {
        //         icons[route.name]({
        //             color: isFocused ? primaryColor : altColor
        //         })
        //     }
        //     <Text style={{ 
        //         color: isFocused ? primaryColor : altColor, 
        //         fontSize: 11
        //         }}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        // );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 25,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'circular',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    }
})
export default TabBar