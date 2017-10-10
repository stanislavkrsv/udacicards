import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { white } from '../../utils/colors'

class DrawerOpenButton extends Component {
  render() {
    return (
      <SimpleLineIcons
        style={styles.button}
        name="menu"
        color={white}
        size={24}
        onPress={()=>{ this.props.navigation.navigate('DrawerOpen')}}
      />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 4,
  }
})

export default DrawerOpenButton