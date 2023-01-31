import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ImageDetails } from '../../types'
import { ImageDetail } from '../components'

const images: ImageDetails[] = [
  {
    title: 'Forest',
    image: require('../../../assets/images/forest.jpg'),
    score: 9,
  },
  {
    title: 'Beach',
    image: require('../../../assets/images/beach.jpg'),
    score: 6,
  },
  {
    title: 'Mountain',
    image: require('../../../assets/images/mountain.jpg'),
    score: 7,
  },
]

export const ImagesScreen = () => (
  <FlatList
    showsVerticalScrollIndicator
    contentContainerStyle={styles.imageDetail}
    data={images}
    ItemSeparatorComponent={({ index }) => {
      const height = index < images.length - 1 ? 10 : 0
      return <View style={itemSeparatorStyles(height).viewStyle} />
    }}
    renderItem={({ item }) => <ImageDetail {...item} />}
  />
)

const styles = StyleSheet.create({
  imageDetail: {
    margin: 10,
    alignItems: 'stretch',
  },
})

const itemSeparatorStyles = (height: number) =>
  StyleSheet.create({
    viewStyle: {
      height: height,
    },
  })
