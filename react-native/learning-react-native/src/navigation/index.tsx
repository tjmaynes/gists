import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigatorParams } from './types'
import { HomeNavigationStack, FeedNavigationStack } from './stacks'

const Tab = createBottomTabNavigator<BottomTabNavigatorParams>()

const NavigationStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeStack"
      component={HomeNavigationStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="FeedStack"
      component={FeedNavigationStack}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
)

export default NavigationStack
