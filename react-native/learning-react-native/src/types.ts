import { ImageSourcePropType } from 'react-native'

export type Action<T, U> = { type: T; payload: U }

export type Friend = {
  name: string
  age: number
}

export type ImageDetails = {
  title: string
  image: ImageSourcePropType
  score: number
}

export enum RGB {
  RED = 'Red',
  GREEN = 'Green',
  BLUE = 'Blue',
}

export type RGBColor = {
  [RGB.RED]: number
  [RGB.GREEN]: number
  [RGB.BLUE]: number
}

export type CountType = 'Increase' | 'Decrease'
