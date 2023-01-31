import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { Friend } from '../../types'

const friends: Friend[] = [
  { name: 'Emily Baron', age: 29 },
  { name: 'Mark Maynes', age: 25 },
  { name: 'Tim Maynes', age: 52 },
  { name: 'Vivian Maynes', age: 49 },
  { name: 'Joseph Cortese', age: 42 },
]

const FriendListItem = ({ name, age }: Friend) => (
  <Text style={styles.textStyle}>
    {name} - Age: {age}
  </Text>
)

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 50,
  },
})

export const FeedScreen = () => (
  <FlatList
    showsVerticalScrollIndicator
    data={friends}
    renderItem={({ item, index }) => <FriendListItem key={index} {...item} />}
  />
)
