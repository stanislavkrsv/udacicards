import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { addDeck } from '../../../actions'
import { white, gray, blue } from '../../../utils/colors'
import DeckButton  from '../../DeckButton'

class NewDeckScreen extends Component {
  state = {
    title: '',
  }

  submit = () => {
    const { title } = this.state
    const { addDeck, navigation } = this.props

    if (title.length === 0) {
      alert('Please fill title field')
      return
    }

    const deck = {id : uuidv4(), title : title, questions: []};
    addDeck(deck)
    this.reset()
    navigation.navigate('DeckViewScreen', {id: deck.id, title: deck.title})
  }

  reset = () => {
    this.setState({
      title: '',
    })
  };

  render() {
    return (
      <View  style={styles.container} >
        <View style={styles.titleContainer}>
          <View style={styles.deck} >
            <View style={styles.deckTitleContainer}>
              <View style={styles.deckBlock}>
                <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
              </View>
              <View style={styles.deckBlock}>
                <TextInput
                  style={styles.deckInput}
                  placeholder={'Deck Title'}
                  onChangeText={(text) => this.setState({title: text})}
                  value={this.state.title}
                />
              </View>
            </View>
            <DeckButton onPress={this.submit}>Create Deck</DeckButton>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,

  },
  titleContainer: {
    flex: .4,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    minHeight: 120,
  },
  deck: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    shadowRadius: 0,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //position: 'relative'
  },
  deckTitleContainer: {
    flex: 4,
    paddingTop:30,
    paddingLeft: 30,
    paddingRight: 30
  },
  deckTitle: {
    fontFamily: 'common-font-bold',
    fontSize: 35,
    lineHeight: 35,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckBlock: {
    flex:1,
    justifyContent: 'center',
  },
  deckInput: {
    borderColor: gray,
    borderWidth: 1,
    height: 38,
    paddingLeft:5,
    borderRadius: 4,
    marginBottom: 0
  }
})


function mapDispatchToProps(dispatch) {
  return {
    addDeck : (deck) => dispatch(addDeck(deck)),
  }
}

export default connect(null, mapDispatchToProps)(NewDeckScreen)