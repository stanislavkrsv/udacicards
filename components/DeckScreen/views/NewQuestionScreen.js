import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addQuestion } from '../../../actions'
import { white, gray } from '../../../utils/colors'
import { getBgImage, IMAGE_RESIZE_MODE } from '../../../utils/bgImages'
import DeckButton  from '../../DeckButton'

class NewQuestionScreen extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { question, answer} = this.state
    const { addQuestion, navigation } = this.props
    const { deck } = navigation.state.params

    if (question.length === 0 || answer.length === 0) {
      alert('Please fill in all fields')
      return
    }

    addQuestion(deck.id, {question , answer})
    this.reset()
    navigation.goBack()
  }

  reset = () => {
    this.setState({
      question: '',
      answer: ''
    })
  }

  render() {

    const  { navigation } = this.props
    const  { index, deck } = navigation.state.params

    return (
      <ImageBackground resizeMode={IMAGE_RESIZE_MODE} style={styles.container} source={getBgImage(index)}>
        <View style={styles.titleContainer} >
          <View style={styles.deck}>
            <View style={styles.deckTitleContainer}>
              <View style={styles.deckBlock}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              </View>
              <KeyboardAvoidingView style={styles.deckBlock} behavior={'padding'}>
                <TextInput
                  style={styles.deckInput}
                  placeholder={'Question'}
                  onChangeText={(text) => this.setState({question: text})}
                  value={this.state.question}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView style={styles.deckBlock} behavior={'padding'}>
                <TextInput
                  style={styles.deckInput}
                  placeholder={'Answer'}
                  onChangeText={(text) => this.setState({answer: text})}
                  value={this.state.answer}
                />
              </KeyboardAvoidingView>
            </View>
            <DeckButton onPress={this.submit}>Submit</DeckButton>
          </View>
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
    position: 'relative'
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
    addQuestion: (deckId, question) => dispatch(addQuestion(deckId, question)),
  }
}

export default connect(null, mapDispatchToProps)(NewQuestionScreen)