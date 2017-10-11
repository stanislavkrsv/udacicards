import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import  { greenButtonBackground, greenButtonText, greenButtonBorder } from '../../utils/colors'

export default function DeckButton({children, onPress, style = {}}) {
  return(
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flex:0.3,
    borderColor: greenButtonBorder,
    backgroundColor: greenButtonBackground,
    minHeight: 35,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  buttonText: {
    fontFamily: 'common-font-bold',
    fontSize: 18,
    color: greenButtonText,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 9
  }
})