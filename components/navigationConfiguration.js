import React from 'react';
import {Text, View } from 'react-native';
import  { Constants } from 'expo'
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import  {SimpleLineIcons } from '@expo/vector-icons'

import  DeckNavigator  from './DeckScreen/navigationConfiguration'
import  NewDeckNavigator  from './NewDeckScreen/navigationConfiguration'

const MainNavigation = DrawerNavigator({
    Desks: {
      screen: DeckNavigator,
      navigationOptions: {
        title: 'Decks',
      }
    },
    NewDesks: {
      screen: NewDeckNavigator,
      navigationOptions: {
        title: 'New Deck',
      }
    },
  },
  {contentComponent: props => (<View><View style={{paddingTop: Constants.statusBarHeight, height: 140}}><Text>Hallo</Text></View><DrawerItems {...props} /></View>)}
)

export default MainNavigation;