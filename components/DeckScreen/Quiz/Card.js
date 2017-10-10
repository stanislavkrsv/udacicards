import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import  { MaterialCommunityIcons } from '@expo/vector-icons'
import { correctButtonEventName , incorrectButtonEventName } from '../../../utils/const'
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

class Card extends Component {

  state = {
    isFlipped: false,
    useNativeDriver: true,
    rotate: new Animated.Value(0),
    opacity: new Animated.Value(0),
    bounceValue: new Animated.Value(1)
  };

  onCorrectPress = () => {
    const { onNextCard } = this.props
    onNextCard(correctButtonEventName)
  }

  onIncorrectPress = () => {
    const { onNextCard } = this.props
    onNextCard(incorrectButtonEventName)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { show } = nextProps
    if (show) {
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
      ]).start()
    } else {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: this.state.useNativeDriver,
      }).start()
    }
  }

  flip = () => {
    const {isFlipped} = this.state
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.setState({isFlipped: !this.state.isFlipped})
        this.timer = null
      }, 90)
    }
    Animated.spring(this.state.rotate, {
      toValue: Number(!isFlipped),
      useNativeDriver: this.state.useNativeDriver,
    }).start()
  }
  render() {

    const { isFlipped } = this.state
    const { show, card } = this.props

    if (!show) {
        return null
    }

    return (
      <Animated.View
        style={[styles.deckContainer, {transform: [{scale : this.state.bounceValue}], opacity : this.state.opacity,}]}
      >
        <Animated.View
          style={[styles.deck, {transform: [{rotateY: this.state.rotate.interpolate({inputRange: [0, 1],  outputRange: [ '0deg', '180deg' ]})},]} ]}
        >
          {!isFlipped && (
            <TouchableOpacity style={styles.cardFront} onPress={this.flip}>
              <View style={styles.cardFrontTextContainer}>
                <Text style={styles.text}>
                  {card.question}
                </Text>
              </View>
              <View style={styles.cardFrontButtonContainer}>
                <MaterialCommunityIcons style={styles.cardFrontButtonIcon} onPress={this.flip} name={'rotate-3d'} size={24} />
                <Text style={styles.cardFrontButtonText}>Show Answer</Text>
              </View>
            </TouchableOpacity>
          )}

          {isFlipped && (
            <View style={styles.cardBack}>
              <View  style={styles.cardBackTextContainer}>
                <TouchableOpacity style={styles.cardBackRotate} onPress={this.flip}>
                  <Text style={styles.cardBackRotateText}>Show Question</Text>
                  <MaterialCommunityIcons style={styles.cardBackRotateIcon} name={'rotate-3d'} size={24} color={gray} />
                </TouchableOpacity>
                <View style={styles.cardBackText}>
                  <Text style={styles.text}>{card.answer}</Text>
                </View>
              </View>

              <View style={styles.cardBackButtonsContainer}>
                <TouchableOpacity style={[styles.deckButton, styles.deckButtonIncorrect]} onPress={this.onIncorrectPress}>
                  <Text style={[styles.deckButtonText, styles.deckButtonIncorrectText]}>
                    <MaterialCommunityIcons name={'chevron-left'} size={18} />
                      Incorrect
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.deckButton, styles.deckButtonCorrect]} onPress={this.onCorrectPress}>
                  <Text style={styles.deckButtonText}>
                    Correct
                    <MaterialCommunityIcons name={'chevron-right'} size={18}/>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            )}
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
  }
})

export default Card