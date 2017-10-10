import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import  { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';
import DeckButton  from '../../DeckButton'
import TextButton  from '../../TextButton'
import  {
  white,
  gray,
  greenButtonBackground,
  greenButtonText,
  greenButtonBorder,
  redButtonBorder,
  redButtonBackground,
  redButtonText
} from '../../../utils/colors'

class Score extends Component {

  state = {
    score: 0,
    lose: false,
    text: '',
    showProgressBar: false,
    useNativeDriver: true,
    opacity: new Animated.Value(0),
    bounceValue: new Animated.Value(1),
    opacityText: new Animated.Value(0),
  };

  componentDidMount() {

    const { percent } = this.props

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

      if (!this.interfaceTimer) {
        this.interfaceTimer = setTimeout(() => {
          this.setState({showProgressBar: true})

          if (percent <= 50) {
            this.setState({lose: true})
            this.setState({text: '...?'})
          } else {
            this.setState({text: 'You Rock!'})
          }
          this.timer = setTimeout(() => {
            this.setState({score: percent})
            this.timer = null
          }, 200)
          this.interfaceTimer = null
        }, 500)
      }
    })
  }

  getImage = () => {
    if (!this.state.lose) {
      return require('./../../../assets/images/yourule.png');
    } else {
      return require('./../../../assets/images/youlose.png');
    }
  }

  render() {

    const { navigation, onRestartQuiz, percent } = this.props
//
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Animated.View
            style={[styles.deck, {transform: [{scale : this.state.bounceValue}], opacity : this.state.opacity,}]}
          >
            <View style={[styles.scoreTitleContainer, { }]}>
              <View style={{flex: 1, paddingTop: 20, alignItems: 'center',}}>
                <View style={{flex: 1, justifyContent: 'center',}}>
                  {this.state.showProgressBar && (
                    <Progress.Circle size={80} formatText={() => `${percent}%`} animated={true} progress={(this.state.score/100)} showsText={true}/>
                  )}
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'common-font-bold', fontSize: 35,}}>{this.state.text}</Text>
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
//
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

  deck: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    //justifyContent: 'center',
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

  /*
  text: {
    fontFamily: 'common-font-bold',
    fontSize: 35,
    textAlign: 'center'
  },
  deckContainer: {
    flex: 1,
    position: 'absolute',
    left: 30,
    right: 30,
    top: 10,
    bottom: 10
  },
  deck: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    justifyContent: 'center',
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
  cardFront: {
    backgroundColor: 'transparent',
    flex: 1,
    transform: [
      {scaleX: 1},
    ],
  },
  cardFrontTextContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  cardFrontButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardFrontButtonIcon: {
    color: gray,
    width: 24,
    flex: 1,
    maxWidth: 24
  },
  cardFrontButtonText: {
    fontFamily: 'common-font-bold',
    fontSize: 17,
    color: gray,
    flex: 10,
    maxWidth: 130,
    paddingLeft: 5
  },
  cardBackRotate: {
    flex: 0.1,
    paddingTop: 8,
    minHeight: 25,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  cardBackRotateText: {
    flex:10,
    textAlign: 'right',
    fontFamily: 'common-font-bold',
    fontSize: 17,
    color: gray,
  },
  cardBackRotateIcon: {
    flex: 1,
    paddingTop: 4,
    minHeight: 22,
    backgroundColor: white,
    paddingLeft: 5
  },
  cardBack: {
    backgroundColor: 'transparent',
    flex: 1,
    transform: [
      {scaleX: -1},
    ],
  },
  cardBackTextContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardBackText: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },


  cardBackButtonsContainer: {
    flex: 0.3,
    minHeight: 25,
    flexDirection: 'row',
  },

  deckButton: {
    flex: 1,
    minHeight: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    position: 'relative'
  },
  deckButtonCorrect: {
    borderColor: greenButtonBorder,
    backgroundColor: greenButtonBackground,
    borderBottomLeftRadius: 0,
  },
  deckButtonIncorrect: {
    borderColor: redButtonBorder ,
    backgroundColor: redButtonBackground,
    borderBottomRightRadius: 0,
  },
  deckButtonText: {
    fontFamily: 'common-font-bold',
    fontSize: 18,
    color: greenButtonText,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 9
  },
  deckButtonIncorrectText: {
    color: redButtonText,
  } */
})

export default Score