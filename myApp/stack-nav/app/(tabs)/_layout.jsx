import React, { useEffect, useState } from 'react';
import { Tabs, useRouter, Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from '../../components/TabBar'

const _layout = () => {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      setIsAuthenticated(!!token);
      setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }
  
  return (
    <Tabs
      tabBar={props=> <TabBar {...props}/>}>
    <Tabs.Screen
      name='index'
      options={{
        title: "Home",
        headerShown: false
    }}
    />

     <Tabs.Screen
      name='explore'
      options={{
        title: "Explore",
    }}
    />
    
     <Tabs.Screen
      name='transactions'
      options={{
        title: "Transactions",
        headerShown: false,
    }}
    />
    
      <Tabs.Screen
      name='profile'
      options={{
        title: "Profile",
        headerShown: false,
    }}
    />
    </Tabs>
  )
}

export default _layout