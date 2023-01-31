import React, { useState } from 'react'
import { View, Button, FlatList } from 'react-native'
import { RGB, RGBColor } from '../../types'
import { ColorBox } from '../components'

export const ColorScreen = () => {
  const [colors, setColors] = useState<RGBColor[]>([])

  return (
    <View>
      <Button
        title="Add a color"
        onPress={() => setColors([...colors, generateRandomColor()])}
      />
      <FlatList
        data={colors}
        renderItem={({ item, index }) => <ColorBox key={index} color={item} />}
      />
    </View>
  )
}

const generateRandomColor = (): RGBColor => ({
  [RGB.RED]: Math.floor(Math.random() * 256),
  [RGB.GREEN]: Math.floor(Math.random() * 256),
  [RGB.BLUE]: Math.floor(Math.random() * 256),
})
