import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'

/**
 * Home represented a way to switch between unanswered and answered questions for authed users,
 * and showed list of question of selected kind
 * Connected to Redux store
 */

class Home extends Component {
  state = {
    tab: 'unans'
  }
  setTab(tab) {
    this.setState({
      tab: tab
    });
  }
  render() {
    const { questionIds, user } = this.props;
    return (
      <div className="home">
        <div className="poll-type-switch">
          <button className={"btn tab-btn" + (this.state.tab === 'unans' ? ' btn-bordered' : '')} onClick={() => this.setTab('unans')}>Unanswered</button>
          <button className={"btn tab-btn" + (this.state.tab === 'ans' ? ' btn-bordered' : '')} onClick={() => this.setTab('ans')}>Answered</button>
        </div>
        <ul className='flat-list'>
          {questionIds
            .filter((id) => ( user && ((this.state.tab === 'unans' && !user.answers[id]) || (this.state.tab === 'ans' && user.answers[id])) ))
            .map((id) => (
              <li key={id}>
                <Poll id={id}/>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ auth, users, questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    user: users[auth]
  }
}

export default connect(mapStateToProps)(Home);