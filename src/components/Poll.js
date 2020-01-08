import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PollView from './PollView'
import PollVote from './PollVote'
import PollResult from './PollResult'

/**
 * Poll card. Contains author name, author avatar and question info.
 * Depends on pollMode, question info could be shown in three different ways
 * view - mode for display poll in list on home page
 * vote - mode for submit answer
 * results - mode for display vote results
 * Connected to Redux store
 */
class Poll extends Component {
  render() {
    const { user, question, author, pollMode} = this.props;
    return (
      <div className="poll">
        {question && (
          <Fragment>
            <img className="poll-user-avatar" src={author.avatarURL} alt=""></img>
            <div className="question-info">
              <p className="poll-author">{author.name} asks:</p>
              <p className="poll-wyr">Would You Rather...</p>
              { (pollMode === 'view') && (<PollView question={question}></PollView>) }
              { (pollMode === 'vote') && (<PollVote question={question}></PollVote>) }
              { (pollMode === 'results') && (<PollResult question={question} user={user}></PollResult>) }
            </div>
          </Fragment>
        )}
        {!question && (
          <h3>Ooops! No such question found :(</h3>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ auth, users, questions }, { id, match }) {
  const user = users[auth];
  const questionId = id ? id : match.params.id;
  const question = questionId && questions[questionId] ? questions[questionId] : null;
  let pollMode = 'view';  // default mode
  // if there is a URL parameter, than show as vote details with form for option selection or with vote results
  if (question && match.params.id && user) {
    if (user.answers[questionId]) {
      pollMode = 'results';
    } else {
      pollMode = 'vote';
    }
  }
  return {
    user,
    pollMode,
    question,
    author: question ? users[question.author] : null
  }
}

export default withRouter(connect(mapStateToProps)(Poll));