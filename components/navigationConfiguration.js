import React from 'react'
import { DrawerNavigator } from 'react-navigation'
import  {SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import  DrawerMenu from './DrawerMenu'
import  DeckNavigator  from './DeckScreen/navigationConfiguration'
import  NewDeckNavigator  from './NewDeckScreen/navigationConfiguration'

const MainNavigation = DrawerNavigator({
    Desks: {
      screen: DeckNavigator,
      navigationOptions: {
        title: 'Decks',
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name={'cards-outline'} color={tintColor} size={25}/>
        )
      }
    },
    NewDesks: {
      screen: NewDeckNavigator,
      navigationOptions: {
        title: 'Add New Deck',
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name={'plus'} color={tintColor} size={25}/>
        )
      }
    },
  },
  {contentComponent: props => (<DrawerMenu {...props}/>)}
)

export default MainNavigation