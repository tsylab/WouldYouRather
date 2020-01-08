import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { setUserAnswer, removeUserAnswer, addUserQuestion } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER'
export const REMOVE_QUESTION_ANSWER = 'REMOVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

/**
 * Put questions to store
 * @param {*} questions object contains questions
 */
export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

/**
 * Add answer to store
 * @param {*} userId User Id
 * @param {*} questionId Question Id
 * @param {*} answer either "optionOne" or "optionTwo"
 */
export function setQuestionAnswer (userId, questionId, answer) {
  return {
    type: SET_QUESTION_ANSWER,
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
export function removeQuestionAnswer (userId, questionId, answer) {
  return {
    type: REMOVE_QUESTION_ANSWER,
    userId,
    questionId,
    answer
  }
}

/**
 * Add answer to store and send it through api. If api request rejected, remove answer from store
 * @param {*} userId User Id
 * @param {*} questionId Question Id
 * @param {*} answer either "optionOne" or "optionTwo"
 */
export function handleQuestionAnswer(userId, questionId, answer) {
  return (dispatch) => {

    dispatch(setUserAnswer(userId, questionId, answer));
    dispatch(setQuestionAnswer(userId, questionId, answer));

    return saveQuestionAnswer({
          authedUser: userId,
          qid: questionId,
          answer
        })
      .catch((e) => {
        console.warn('Error in handleQuestionAnswer: ', e);
        dispatch(removeUserAnswer(userId, questionId, answer));
        dispatch(removeQuestionAnswer(userId, questionId, answer));
        alert('Error saving your answer. Try again.');
      })
  }
}

/**
 * Add new question to sotre
 * @param {*} question question description
 */
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

/**
 * Send new question through api, and after that add it to store
 * @param {*} auth User Id
 * @param {*} optionOneText first option text
 * @param {*} optionTwoText second option text
 */
export function handleAddQuestion(auth, optionOneText, optionTwoText) {
  return (dispatch) => {

    dispatch(showLoading());

    return saveQuestion({
        author: auth,
        optionOneText,
        optionTwoText
      })
    .then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(auth, question.id));
      },
      (e) => {
        console.warn('Error in handleAddQuestion: ', e);
        alert('Error adding your question. Try again.');
      }
    )
    .then(() => dispatch(hideLoading()));
  }
}