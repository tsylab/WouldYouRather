export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SET_USER_ANSWER = 'SET_USER_ANSWER'
export const REMOVE_USER_ANSWER = 'REMOVE_USER_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

/**
 * Put users to store
 * @param {*} users object contains users
 */
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

/**
 * Add answer to store
 * @param {*} userId User Id
 * @param {*} questionId Question Id
 * @param {*} answer either "optionOne" or "optionTwo"
 */
export function setUserAnswer(userId, questionId, answer) {
  return {
    type: SET_USER_ANSWER,
    userId,
    questionId,
    answer
  }
}

/**
 * Remove answer from store
 * @param {*} userId User Id
 * @param {*} questionId Question Id
 * @param {*} answer either "optionOne" or "optionTwo"
 */
export function removeUserAnswer(userId, questionId, answer) {
  return {
    type: REMOVE_USER_ANSWER,
    userId,
    questionId,
    answer
  }
}


/**
 * Add new question to user question list in sore
 * @param {*} userId User Id
 * @param {*} question question Id
 */
export function addUserQuestion(userId, questionId) {
  return {
    type: ADD_USER_QUESTION,
    userId,
    questionId
  }
}
