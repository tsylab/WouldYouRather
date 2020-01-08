import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RestrictedInput from './RestrictedInput'
import { handleAddQuestion } from '../actions/questions'

/**
 * Component represented from for creating new questions
 * Connected to Redux store
 */

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, auth, history } = this.props;
    const { optionOne, optionTwo } = this.state;
    dispatch(handleAddQuestion(auth, optionOne, optionTwo))
      .then(() => { history.push(`/`) });

  }
  onOptionChange = (text, key) => {
    this.setState((currState) => (
      {
        ...currState,
        [key]: text
      }
    ));
  }
  render() {
    const { optionOne, optionTwo } = this.state;
    return (
      <div className="add-question">
        <p className="poll-wyr">Would You Rather...</p>
        <form onSubmit={this.handleSubmit}>
          <RestrictedInput
            inputKey="optionOne"
            title="Option One"
            limit="100"
            onChange={this.onOptionChange}>
          </RestrictedInput>
          <RestrictedInput
            inputKey="optionTwo"
            title="Option Two"
            limit="100"
            onChange={this.onOptionChange}>
          </RestrictedInput>
          <button
            type='submit'
            className="btn btn-bordered"
            disabled={optionOne === '' || optionTwo === ''}>
              Add Question
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ auth }, { history }) {
  return {
    auth,
    history
  }
}

export default withRouter(connect(mapStateToProps)(AddQuestion));