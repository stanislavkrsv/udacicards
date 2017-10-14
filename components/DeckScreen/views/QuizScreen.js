import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import * as Progress from 'react-native-progress'
import { white } from '../../../utils/colors'
import { getBgImage, IMAGE_RESIZE_MODE } from '../../../utils/bgImages'
import { correctButtonEventName , incorrectButtonEventName } from '../../../utils/const'
import Card  from '../Quiz/Card'
import Score  from '../Quiz/Score'

class QuizScreen extends Component {

  state = {
    cards: [],
    currentCard: -1,
    totalCard: 0,
    correctCount: 0,
    incorrectCount: 0,
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params
    this.setState(
      {
        totalCard : deck.questions.length - 1,
        cards : deck.questions,
      }, this.startQuiz)
  }

  startQuiz = () => {
    this.setState({
      currentCard : -1,
      correctCount : 0,
      incorrectCount : 0,
    }, this.onNextCard)
  }

  onNextCard = (status) => {
    this.setState((prevState, props) => ({
      correctCount: prevState.correctCount + (status === correctButtonEventName ? 1 : 0),
      incorrectCount: prevState.incorrectCount + (status === incorrectButtonEventName ? 1 : 0),
      }), ()=> {
        this.setState((prevState, props) => ({currentCard: prevState.currentCard + 1,}))
      }
    )
  }

  render() {

    const  { navigation } = this.props
    const  { index } = navigation.state.params
    const  { cards, currentCard, totalCard, correctCount } = this.state

    return (
      <ImageBackground resizeMode={IMAGE_RESIZE_MODE} style={styles.container} source={getBgImage(index)}>
        {currentCard > totalCard
          ? (
            <Score
              percent={Number(Math.round(correctCount/(totalCard+1) * 100).toFixed(2))}
              navigation={navigation}
              onRestartQuiz={this.startQuiz}
            />
          ) : (
          <View style={styles.quizContainer}>
            <View style={styles.cardContainer}>
            {cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                show={currentCard === index}
                onNextCard={this.onNextCard}
              />
            ))}
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>{currentCard + 1}/{totalCard + 1}</Text>
              <Progress.Bar color={white}  progress={(currentCard + 1)/(totalCard + 1)} width={null}/>
            </View>
          </View>
        )}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  quizContainer: {
    flex: 1,
    paddingTop: 30
  },
  cardContainer: {
    flex: 4,
    backgroundColor:'transparent'
  },
  progressContainer: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    opacity: .8,
    justifyContent: 'center',
  },
  progressText: {
    color: white,
    fontFamily: 'common-font-bold',
    fontSize: 18,
    lineHeight: 18
  }
})

export default QuizScreen