import { RECEIVE_USERS, REMOVE_USER_ANSWER, SET_USER_ANSWER, ADD_USER_QUESTION } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SET_USER_ANSWER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.questionId]: action.answer
          }
        }
      }
      case REMOVE_USER_ANSWER:
        const answers = Object.assign({}, state[action.userId].answers);
        delete answers[action.questionId]; // remove answer

        return {
          ...state,
          [action.userId]: {
            ...state[action.userId],
            answers
          }
        }
    case ADD_USER_QUESTION: {
      return {
        ...state,
          [action.userId]: {
            ...state[action.userId],
            questions: state[action.userId].questions.concat([action.questionId])
          }
      }
    }
    default:
      return state
  }
}