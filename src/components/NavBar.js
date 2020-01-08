import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logoutUser } from '../actions/auth'

/**
 * Main navigation in app. Always visible. Represents major pages links, info about authorized user and login/logout button
 * Connected to Redux store
 */

class NavBar extends Component {
  linkClassName(link, path) {
    return 'btn nav-btn' + (link === path ? ' btn-bordered' : '');
  }
  onLoginClick = () => {
    const { dispatch, history } = this.props;
    dispatch(logoutUser());
    history.push(`/login`);
  }
  render() {
    const { user, location } = this.props;
    const path = location.pathname;

    return (
      <div className="nav-bar">
        <div className="nav-buttons">
          <Link to="/" className={this.linkClassName('/', path)}>Home</Link>
          <Link to="/add" className={this.linkClassName('/add', path)}>New Question</Link>
          <Link to="/leaderboard" className={this.linkClassName('/leaderboard', path)}>Leader Board</Link>
        </div>
        <div className="nav-login-info">
          {
            user
              ? (
                <Fragment>
                  <img className="nav-user-avatar" src={user.avatarURL} alt=""></img>
                  <span className="nav-user-name">{user.name}</span>
                  <button className="btn nav-btn btn-bordered" onClick={this.onLoginClick}>Loguot</button>
                </Fragment>
              )
              : (
                <Link to="/login" className="btn nav-btn" >Login</Link>
              )

          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ auth, users }, { history }) {
  return {
    user: auth ? users[auth] : null,
    history
  }
}

export default withRouter(connect(mapStateToProps)(NavBar));