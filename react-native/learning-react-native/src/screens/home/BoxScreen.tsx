import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'

const createRange = (limit: number = 3): undefined[] => {
  let range: undefined[] = []
  for (let i = 0; i < limit; i++) range.push(undefined)
  return range
}

const BOX_LIMIT = 20

export const BoxScreen = () => (
  <View style={styles.viewStyle}>
    <FlatList
      data={createRange(BOX_LIMIT)}
      renderItem={({ index }) => {
        const style =
          index === BOX_LIMIT - 1
            ? styles.regularTextStyle
            : styles.lastChildTextStyle
        return <Text style={style}>Child {index + 1}</Text>
      }}
    />
  </View>
)

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 3,
    borderColor: 'black',
    padding: 10,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  regularTextStyle: {
    borderWidth: 3,
    borderColor: 'red',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  lastChildTextStyle: {
    borderWidth: 3,
    borderColor: 'red',
    padding: 10,
    textAlign: 'center',
    marginBottom: 0,
  },
})
