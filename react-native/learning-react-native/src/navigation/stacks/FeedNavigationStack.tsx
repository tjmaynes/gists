import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FeedScreen } from '../../screens/feed'
import { FeedStackNavigatorParams } from '../types'

const FeedStack = createNativeStackNavigator<FeedStackNavigatorParams>()

export const FeedNavigationStack = () => (
  <FeedStack.Navigator initialRouteName="Feed">
    <FeedStack.Screen name="Feed" component={FeedScreen} />
  </FeedStack.Navigator>
)
