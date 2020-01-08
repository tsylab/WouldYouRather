import { combineReducers } from 'redux'
import questions from './questions'
import users from './users'
import auth from './auth'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  auth,
  users,
  questions,
  loadingBar: loadingBarReducer
})