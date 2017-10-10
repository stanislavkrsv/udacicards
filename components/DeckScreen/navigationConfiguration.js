import React from 'react';
import { StackNavigator } from 'react-navigation'
import  {SimpleLineIcons } from '@expo/vector-icons'
import { blue, white } from '../../utils/colors'

import  DeckListScreen  from './views/DeckListScreen'
import  DeckViewScreen from './views/DeckViewScreen'
import  QuizScreen from './views/QuizScreen'
import  DrawerOpenButton from '../DrawerOpenButton'

const DeckNavigator = StackNavigator({
  DeckListScreen: {
    screen: DeckListScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Home',
      headerLeft: <DrawerOpenButton navigation={navigation}/>,
    })},

   DeckViewScreen: {
    screen: DeckViewScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      drawerLockMode: 'locked-closed'
      //headerLeft: null,
    })
  },

  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Quiz',
      drawerLockMode: 'locked-closed'
      //headerLeft: null,
    })
  },
  },
  {
    initialRouteName: 'QuizScreen',
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: { color: white },
      headerTintColor: white,
    }),
    initialRouteParams: { index:  2, deck: {
      id: 'yskqx55q',
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    } }
  }
)

export default DeckNavigator