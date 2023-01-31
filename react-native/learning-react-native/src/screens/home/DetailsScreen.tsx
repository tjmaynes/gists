import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { DetailsScreenRouteProp } from '../../navigation/types'

export const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>()
  const { name } = route.params

  return (
    <View style={styles.viewStyle}>
      <Text>Details Screen</Text>
      <Text style={styles.nameStyle}>Name: {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: { fontSize: 18, paddingBottom: 12 },
})
