import { RECEIVE_QUESTIONS, REMOVE_QUESTION_ANSWER, SET_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case SET_QUESTION_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([action.userId])
          }
        }
      }
    case REMOVE_QUESTION_ANSWER:
        return {
          ...state,
          [action.questionId]: {
            ...state[action.questionId],
            [action.answer]: {
              ...state[action.questionId][action.answer],
              votes: state[action.questionId][action.answer].votes.filter((uid) => (uid !== action.userId))
            }
          }
        }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    default:
      return state
  }
}