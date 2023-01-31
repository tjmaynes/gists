import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

const ErrorText = ({ message }: { message: string }) => (
  <Text style={{ color: `red` }}>{message}</Text>
)

export const TextScreen = () => {
  const [password, setPassword] = useState('')
  return (
    <View>
      <Text>Enter password:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChange={e => setPassword(e.nativeEvent.text)}
      />
      {password.length <= 4 ? (
        <Text>Password: {password}</Text>
      ) : (
        <ErrorText message="Password must be less than 4 characters long" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
})
