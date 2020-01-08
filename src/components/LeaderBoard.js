import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

/**
 * Leaderboard is a list of users, in order of amount of asked questions and answered questions combined
 * Connected to Redux store
 */
class LeaderBoard extends Component {
  render() {
    const { auth, users } = this.props;
    return (
      <div className="home">
        <ul className='flat-list'>
          {users.map((user, index) => (
              <li key={user.id} className={ user.id === auth ? 'selected' : '' }>
                <UserCard user={user} rank={index + 1}/>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ auth, users }) {
  return {
    auth,
    users: Object.keys(users)
      .map((id) => ({
          ...users[id],
          answers: Object.keys(users[id].answers).length,
          questions: users[id].questions.length
        }))
      .sort((a,b) => (b.answers + b.questions) - (a.answers + a.questions))
  }
}

export default connect(mapStateToProps)(LeaderBoard);