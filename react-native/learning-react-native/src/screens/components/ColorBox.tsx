import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RGB, RGBColor } from '../../types'

const getBackgroundColor = (color: RGBColor) =>
  `rgb(${color[RGB.RED]},${color[RGB.GREEN]},${color[RGB.BLUE]})`

type ColorBoxProps = { color: RGBColor }

export const ColorBox = ({ color }: ColorBoxProps) => (
  <View style={styles(color).viewStyle} />
)

const styles = (color: RGBColor) =>
  StyleSheet.create({
    viewStyle: {
      height: 100,
      width: 100,
      backgroundColor: getBackgroundColor(color),
    },
  })
