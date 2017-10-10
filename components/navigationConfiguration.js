import React from 'react';
import {Text, View } from 'react-native';
import  { Constants } from 'expo'
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import  {SimpleLineIcons } from '@expo/vector-icons'

import  DeckNavigator  from './DeckScreen/navigationConfiguration'

const MainNavigation = DrawerNavigator({
    Desks: {
      screen: DeckNavigator,
      navigationOptions: {
        //tabBarLabel: 'Desks0',
        title: 'Home',
      }
    },
  },
  {contentComponent: props => (<View><View style={{paddingTop: Constants.statusBarHeight, height: 140}}><Text>Hallo</Text></View><DrawerItems {...props} /></View>)}
)

export default MainNavigation;