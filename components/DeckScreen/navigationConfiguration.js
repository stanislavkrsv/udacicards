import React from 'react'
import { StackNavigator } from 'react-navigation'
import  {SimpleLineIcons } from '@expo/vector-icons'
import { blue, white } from '../../utils/colors'

import  DeckListScreen  from './views/DeckListScreen'
import  DeckViewScreen from './views/DeckViewScreen'
import  NewQuestionScreen from './views/NewQuestionScreen'
import  QuizScreen from './views/QuizScreen'
import  DrawerOpenButton from '../DrawerOpenButton'

const DeckNavigator = StackNavigator({
  DeckListScreen: {
    screen: DeckListScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Decks',
      headerLeft: <DrawerOpenButton navigation={navigation}/>,
    })},

   DeckViewScreen: {
    screen: DeckViewScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      drawerLockMode: 'locked-closed'
    })},

  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Quiz',
      drawerLockMode: 'locked-closed'
    })},

  NewQuestionScreen: {
    screen: NewQuestionScreen,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'New Question',
      drawerLockMode: 'locked-closed'
    })},

  },
  {
    initialRouteName: 'DeckListScreen',
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: { color: white },
      headerTintColor: white,
    }),
    initialRouteParams: { index:  2, id: 'yskqx55q', title: 'React', deck: {
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