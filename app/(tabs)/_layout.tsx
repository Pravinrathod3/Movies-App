import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { BlurView } from 'expo-blur';

import { Tabs } from 'expo-router';
import React from 'react';


const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        
        tabBarItemStyle: {
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 50,
          marginHorizontal: 20,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <BlurView 
           intensity={100}
           style={{flex : 1}}
          />
        )
      }}
    >
        <Tabs.Screen 
          name='index'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: () => (
              <Feather name="home" size={24} color="black" />
          )

          }}
        />
        <Tabs.Screen 
          name='search'
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="search1" size={24} color="black" />
            )

          }}
        />
        <Tabs.Screen 
          name='save'
          options={{
            title: 'Save',
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="save" size={24} color="black" />
            ) 

          }}
        />
        <Tabs.Screen 
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="user" size={24} color="black" />
            )

          }}
        />
    </Tabs>
  )
}

export default _layout