import React, { useReducer } from 'react'
import { Text, View, Button } from 'react-native'
import { Action, CountType } from '../../types'

const COUNTER_SCALE = 5

type CounterState = { count: number }
type CounterAction = Action<CountType, number>

const counterReducer = (
  state: CounterState,
  { type, payload }: CounterAction
) => {
  switch (type) {
    case 'Increase':
      return { ...state, count: state.count + payload }
    case 'Decrease':
      return { ...state, count: state.count - payload }
    default:
      return state
  }
}

export const CounterScreen = () => {
  const [{ count }, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <View>
      <Button
        title="Increase"
        onPress={() => dispatch({ type: 'Increase', payload: COUNTER_SCALE })}
      />
      <Button
        title="Decrease"
        onPress={() => dispatch({ type: 'Decrease', payload: COUNTER_SCALE })}
      />
      <Text>Current count: {count}</Text>
    </View>
  )
}
