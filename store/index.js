import { createStore, compose, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const store = createStore(
  reducer,
  undefined,
  compose(applyMiddleware(thunk), autoRehydrate())
)
persistStore(store, { storage: AsyncStorage })

export default store