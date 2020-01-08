import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../actions/auth'

/**
 * Component for authorize. After submit, redirects to previous page (if it set in location) or to home page
 * Connected to Redux store
 */

class Login extends Component {
  state = {
    selectedUser: this.props.auth ? this.props.auth : (this.props.userList && this.props.userList.length ? this.props.userList[0].id : 0)
  }
  onChange = (e) => {
    this.setState({
      selectedUser: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, history, from } = this.props;
    dispatch(loginUser(this.state.selectedUser));
    history.push(from ? from : `/`);
  }
  render() {
    const  { userList, users } = this.props;
    const avatarURL = users && users[this.state.selectedUser] && users[this.state.selectedUser].avatarURL ? users[this.state.selectedUser].avatarURL : null
    return (
      <div className="login">
        <h2>Please sign in</h2>
        { avatarURL && (
          <img className="poll-user-avatar" src={avatarURL} alt=""></img>
        ) }
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.selectedUser} onChange={this.onChange}>
          {
            userList.map((user) => (
              <option
                key={user.id}
                value={user.id}>
                  {user.name}
              </option>
            ))
          }
          </select>
          <button
            type='submit'
            className="btn btn-bordered">
              Sign in
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ auth, users }, { history, location }) {
  const from = location && location.state && location.state.from ? location.state.from : null
  return {
    auth,
    users,
    userList: Object.keys(users)
      .map((id) => ({
          id,
          name: users[id].name,
          avatarURL: users[id].avatarURL
        }))
      .sort((a,b) => a.name.localeCompare(b.name)),
    history,
    from
  }
}

export default withRouter(connect(mapStateToProps)(Login));