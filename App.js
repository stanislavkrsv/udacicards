import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { AppLoading } from 'expo'
import { cacheResourcesAsync } from './utils/cache'
import { setLocalNotification } from './utils/notification'
import MainNavigation from './components/navigationConfiguration'

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  state = {
    appLoaded: false
  }

  render() {

    if (!this.state.appLoaded) {
        return (
          <AppLoading
            startAsync={cacheResourcesAsync}
            onFinish={() => this.setState({ appLoaded: true })}
          />
        )
    }

    return (
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    )
  }
}