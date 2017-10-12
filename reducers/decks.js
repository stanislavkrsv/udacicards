import { defaultState } from './fixtures/decks'
import {
  ADD_DECK,
  ADD_QUESTION
} from './../actions/types'


function decks(state = defaultState, action) {

  const { deck, deckId, question } = action

  switch (action.type) {
    case ADD_DECK: {
      let newState = state.slice()
      newState.push(deck)
      return newState
    }
    case ADD_QUESTION: {
      const index = state.findIndex(data => data.id === deckId)
      const deck = state.find(data => data.id === deckId)
      deck.questions.push(question)
      return [
        ...state.slice(0, index),
        deck,
        ...state.slice(index + 1)
      ]
    }
    default:
      return state
  }
}

export default decks