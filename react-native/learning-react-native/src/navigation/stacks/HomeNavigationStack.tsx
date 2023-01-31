import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  HomeScreen,
  DetailsScreen,
  ImagesScreen,
  CounterScreen,
  ColorScreen,
  SquareScreen,
  TextScreen,
  BoxScreen,
} from '../../screens/home'
import { HomeStackNavigatorParams } from '../types'

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParams>()

export const HomeNavigationStack = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
    <HomeStack.Screen name="Images" component={ImagesScreen} />
    <HomeStack.Screen name="Counter" component={CounterScreen} />
    <HomeStack.Screen name="Color" component={ColorScreen} />
    <HomeStack.Screen name="Square" component={SquareScreen} />
    <HomeStack.Screen name="Text" component={TextScreen} />
    <HomeStack.Screen name="Box" component={BoxScreen} />
  </HomeStack.Navigator>
)
