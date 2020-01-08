import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionAnswer } from '../actions/questions'

/**
 * Displays form for poll voting with two options
 */
class PollVote extends Component {
  state = {
    answer: 'optionOne'
  }
  onVoteChange = (e) => {
    this.setState({
      answer: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { auth, question, dispatch } = this.props;
    const { answer } = this.state;

    dispatch(handleQuestionAnswer(auth, question.id, answer));
  }
  render() {
    const { question } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className='flat-list vote-list'>
          <li>
            <label>
              <input
                type="radio"
                value="optionOne"
                checked={this.state.answer === 'optionOne'}
                onChange={this.onVoteChange} />
              {question.optionOne.text}
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                value="optionTwo"
                checked={this.state.answer === 'optionTwo'}
                onChange={this.onVoteChange} />
              {question.optionTwo.text}
            </label>
          </li>
        </ul>
        <button type='submit' className="btn btn-poll btn-bordered">Submit</button>
      </form>
    )
  }
}

function mapStateToProps ({ auth }, { question }) {
  return {
    auth,
    question
  }
}

export default connect(mapStateToProps)(PollVote);