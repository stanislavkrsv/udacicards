import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import  { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Progress from 'react-native-progress'
import { clearLocalNotification, setLocalNotification } from '../../../utils/notification'
import DeckButton  from '../../DeckButton'
import TextButton  from '../../TextButton'
import  { white } from '../../../utils/colors'

class Score extends Component {

  state = {
    score: 0,
    lose: false,
    text: '',
    interfaceTimer: null,
    showProgressBar: false,
    useNativeDriver: true,
    opacity: new Animated.Value(0),
    bounceValue: new Animated.Value(1),
    opacityText: new Animated.Value(0),
  }

  componentDidMount() {

    const { percent } = this.props

    clearLocalNotification()
     .then(setLocalNotification())

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: this.state.useNativeDriver,
    }).start()
    Animated.sequence([
      Animated.timing(this.state.bounceValue, {
        duration: 200,
        toValue: 1.04,
        useNativeDriver:
        this.state.useNativeDriver,
      }),
      Animated.spring(this.state.bounceValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: this.state.useNativeDriver,
      }),
    ]).start(()=> {
      if (this.state.interfaceTimer === null) {
        let interfaceTimer = setTimeout(() => {
          this.setState({showProgressBar: true})

          if (percent <= 50) {
            this.setState({
              lose: true,
              text: '...?'
            })
          } else {
            this.setState({text: 'You Rock!'})
          }
          this.setState({score: percent, interfaceTimer: null})
        }, 500)
        this.setState({interfaceTimer})
      }
    })
  }

  componentWillUnmount() {
    if (this.state.interfaceTimer !== null) {
      clearInterval(this.state.interfaceTimer)
    }
  }

  getImage = () => {
    if (!this.state.lose) {
      return require('./../../../assets/images/yourule.png')
    } else {
      return require('./../../../assets/images/youlose.png')
    }
  }

  render() {

    const { navigation, onRestartQuiz, percent } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Animated.View
            style={[styles.deck, {transform: [{scale : this.state.bounceValue}], opacity : this.state.opacity,}]}
          >
            <View style={styles.scoreTitleContainer}>
              <View style={styles.scoreTitleWrapper}>
                <View style={styles.scoreProgressContainer}>
                  {this.state.showProgressBar && (
                    <Progress.Circle size={80} formatText={() => `${percent}%`} animated={true} progress={(this.state.score/100)} showsText={true}/>
                  )}
                </View>
                <View style={styles.scoreTitleWrapper}>
                  <Text style={styles.scoreText}>{this.state.text}</Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Image resizeMode='contain' style={{flex: 1} } source={this.getImage()}/>
              </View>
            </View>
            <DeckButton onPress={()=> {navigation.goBack()}}>Back to Deck</DeckButton>
          </Animated.View>
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton onPress={onRestartQuiz}>Restart Quiz</TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  scoreContainer: {
    flex: 5,
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  scoreTitleContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 30,
    paddingRight: 30
  },
  scoreTitleWrapper: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  scoreProgressContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scoreText: {
    fontFamily: 'common-font-bold',
    fontSize: 35,
  },
  deck: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    shadowRadius: 0,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    transform: [
      { perspective: 1000 }
    ],
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default Score