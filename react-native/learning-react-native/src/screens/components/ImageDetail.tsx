import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { ImageDetails } from '../../types'

export const ImageDetail = ({ title, image, score }: ImageDetails) => (
  <View style={styles.viewStyle}>
    <Image source={image} />
    <Text>{title}</Text>
    <Text>Score: {score}</Text>
  </View>
)

const styles = StyleSheet.create({
  viewStyle: {},
})
