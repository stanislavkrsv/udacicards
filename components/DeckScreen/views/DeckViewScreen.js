import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../../../utils/colors'
import { getBgImage } from '../../../utils/bgImages'
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

    const  { navigation, deck } = this.props
    const  { index } = navigation.state.params

    return (
      <ImageBackground resizeMode="repeat" style={styles.container} source={getBgImage(index)}>
        <View style={styles.titleContainer}>
          <View style={styles.deck}>
            <View style={styles.deckTitleContainer}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.deckQuantity}>{deck.questions.length} cards</Text>
            </View>
            <DeckButton onPress={() => navigation.navigate('QuizScreen', {index : index, deck : deck})}>Start Quiz</DeckButton>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton>Add Card</TextButton>
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
    color: '#9B9B9B'
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

})


function mapStateToProps({ decks }, { navigation }) {
  let { id } = navigation.state.params
  let deck = decks.find(item => item.id === id)
  return {
    deck
  }
}

export default connect(mapStateToProps)(DeckViewScreen)