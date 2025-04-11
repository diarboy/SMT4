import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
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
      name='profile'
      options={{
        title: "Profile",
        headerShown: false,
    }}
    />
    
     <Tabs.Screen
      name='transactions'
      options={{
        title: "Transactions"
    }}
    />
    </Tabs>
  )
}

export default _layout