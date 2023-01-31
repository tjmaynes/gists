import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type HomeStackNavigatorParams = {
  Home: undefined
  Details: {
    name?: string | undefined
  }
  Images: undefined
  Counter: undefined
  Color: undefined
  Square: undefined
  Text: undefined
  Box: undefined
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParams,
  'Details'
>

export type DetailsScreenRouteProp = RouteProp<
  HomeStackNavigatorParams,
  'Details'
>

export type FeedStackNavigatorParams = {
  Feed: undefined
}

export type BottomTabNavigatorParams = {
  HomeStack: HomeStackNavigatorParams
  FeedStack: FeedStackNavigatorParams
  SettingsStack: undefined
}
