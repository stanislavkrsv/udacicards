import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import  { white } from '../../utils/colors'

export default function TextButton({children, onPress, style = {}}) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    color: white,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'common-font-bold',
    paddingTop: 10,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
  }
})