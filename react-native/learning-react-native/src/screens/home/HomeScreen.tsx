import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, StyleSheet, View } from 'react-native'
import { HomeScreenNavigationProp } from '../../navigation/types'

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const name = 'TJ'

  return (
    <View style={styles.viewStyle}>
      <Button
        title="Go to Details screen"
        onPress={() =>
          navigation.navigate('Details', {
            name: name,
          })
        }
      />
      <Button
        title="Go to Images screen"
        onPress={() => navigation.navigate('Images')}
      />
      <Button
        title="Go to Counter screen"
        onPress={() => navigation.navigate('Counter')}
      />
      <Button
        title="Go to Color screen"
        onPress={() => navigation.navigate('Color')}
      />
      <Button
        title="Go to Square screen"
        onPress={() => navigation.navigate('Square')}
      />
      <Button
        title="Go to Text screen"
        onPress={() => navigation.navigate('Text')}
      />
      <Button
        title="Go to Box screen"
        onPress={() => navigation.navigate('Box')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
