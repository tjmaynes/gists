import React, { useReducer } from 'react'
import { View, FlatList } from 'react-native'
import { Action, CountType, RGB, RGBColor } from '../../types'
import { ColorBox, ColorCounter } from '../components'

const createColor = (red: number, green: number, blue: number): RGBColor => ({
  [RGB.RED]: red,
  [RGB.GREEN]: green,
  [RGB.BLUE]: blue,
})

const Colors = { White: createColor(255, 255, 255) }
const COLOR_SCALE = 5

type ColorState = { color: RGBColor }
type ColorAction = Action<CountType, { color: RGB }>

const colorReducer = (state: ColorState, { type, payload }: ColorAction) => {
  const currentValue = state.color[payload.color]

  switch (type) {
    case 'Increase':
      return currentValue + COLOR_SCALE <= 255
        ? {
            color: {
              ...state.color,
              [payload.color]: currentValue + COLOR_SCALE,
            },
          }
        : state
    case 'Decrease':
      return currentValue + COLOR_SCALE >= 0
        ? {
            color: {
              ...state.color,
              [payload.color]: currentValue - COLOR_SCALE,
            },
          }
        : state
    default:
      return state
  }
}

const availableColors = Object.keys(RGB).map(
  (rawValue: string) => RGB[rawValue as keyof typeof RGB]
)

export const SquareScreen = () => {
  const [state, dispatch] = useReducer(colorReducer, {
    color: Colors.White,
  })

  return (
    <View>
      <FlatList
        data={availableColors}
        renderItem={({ item }) => (
          <ColorCounter
            color={item}
            onChange={count => {
              dispatch({
                type: count,
                payload: { color: toRGB(item) },
              })
            }}
          />
        )}
      />
      <ColorBox {...state} />
    </View>
  )
}

const toRGB = (v: string): RGB => {
  switch (v) {
    case 'Red':
      return RGB.RED
    case 'Green':
      return RGB.GREEN
    case 'Blue':
      return RGB.BLUE
    default:
      return RGB.RED
  }
}
