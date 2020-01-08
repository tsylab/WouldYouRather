import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { getInitialData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

/**
 * Receives initial data from api
 */
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    })
  }
}