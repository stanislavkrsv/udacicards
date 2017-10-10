import { createStore, compose, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import thunk from 'redux-thunk';
import reducer from '../reducers'

const store = createStore(reducer)

export default store