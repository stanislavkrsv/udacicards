import uuidv4 from 'uuid/v4'
import {
  ADD_DECK,
  ADD_QUESTION
} from './types'


export const addQuestion = (deckId, question) => ({
  type: ADD_QUESTION,
  deckId,
  question,
})