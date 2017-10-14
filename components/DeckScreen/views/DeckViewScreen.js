import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { white, gray } from '../../../utils/colors'
import { getBgImage, IMAGE_RESIZE_MODE } from '../../../utils/bgImages'
import TextButton  from '../../TextButton'
import DeckButton  from '../../DeckButton'

class DeckViewScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }


  render() {

    const  { index, questionCount , deck, navigation } = this.props

    return (
      <ImageBackground resizeMode={IMAGE_RESIZE_MODE} style={styles.container} source={getBgImage(index)}>
        <View style={styles.titleContainer}>
          <View style={styles.deck}>
            <View style={styles.deckTitleContainer}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              {deck.questions.length > 0 ? (
                <Text style={styles.deckQuantity}>{questionCount} cards</Text>
              ) : (
                <Text style={styles.deckQuantity}>
                  Deck is empty
                </Text>
              )}
            </View>
            {deck.questions.length > 0 && (
              <DeckButton onPress={() => navigation.navigate('QuizScreen', {index : index, deck : deck})}>Start Quiz</DeckButton>
            )}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton onPress={() => navigation.navigate('NewQuestionScreen', {index : index, deck : deck})}>Add Card</TextButton>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  deck: {
    flex: .8,
    backgroundColor: white,
    borderRadius: 10,
    shadowRadius: 0,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  deckTitleContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  deckTitle: {
    fontFamily: 'common-font-bold',
    fontSize: 35,
  },
  deckQuantity: {
    color: gray,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})


function mapStateToProps({ decks }, { navigation }) {
  let { id } = navigation.state.params
  let index = navigation.state.params.index === undefined ?  decks.length - 1 : navigation.state.params.index
  let deck = decks.find(item => item.id === id)
  return {
    deck: deck,
    questionCount: deck.questions.length,
    index: index
  }
}

export default connect(mapStateToProps)(DeckViewScreen)