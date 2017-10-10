import React from 'react';
import { StackNavigator } from 'react-navigation'
import  {SimpleLineIcons } from '@expo/vector-icons'
import { blue, white } from '../../utils/colors'

import  DeckListScreen  from './views/DeckListScreen'

const NewDeckNavigator = StackNavigator({
  DeckListScreen: {
    screen: DeckListScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Desks',
      headerLeft: <SimpleLineIcons name="menu" color={white} size={24} onPress={()=>{ navigation.navigate('DrawerOpen')}}/>,
    })},
  /*
  DesksInfo: {
    screen: DeckListScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Tibbtle',
    })
  },
  */
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: { color: white },
    })
  }
)

export default NewDeckNavigator