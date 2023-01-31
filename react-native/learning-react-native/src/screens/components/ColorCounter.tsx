import React from 'react'
import { View, Text, Button } from 'react-native'
import { CountType, RGB } from '../../types'

type ColorCounterProp = { color: RGB; onChange: (count: CountType) => void }

export const ColorCounter = ({ color, onChange }: ColorCounterProp) => {
  return (
    <View>
      <Text>{color}</Text>
      <Button
        title={`Increase ${color}`}
        onPress={() => onChange('Increase')}
      />
      <Button
        title={`Decrease ${color}`}
        onPress={() => onChange('Decrease')}
      />
    </View>
  )
}
