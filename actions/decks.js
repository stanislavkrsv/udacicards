import {
  ADD_DECK,
  ADD_QUESTION
} from './types'

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
})

export const addQuestion = (deckId, question) => ({
  type: ADD_QUESTION,
  deckId,
  question,
})