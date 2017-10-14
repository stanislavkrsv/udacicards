import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Platform } from 'react-native'
import  {SimpleLineIcons } from '@expo/vector-icons'
import { blue, white } from '../../utils/colors'
import  NewDeckScreen  from './views/NewDeckScreen'
import  DrawerOpenButton from '../DrawerOpenButton'

const NewDeckNavigator = StackNavigator({
  NewDeckScreen: {
    screen: NewDeckScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Desks',
      headerLeft: <DrawerOpenButton navigation={navigation}/>,
    })},
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: { color: white },
    }),
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
    }
  }
)

export default NewDeckNavigator