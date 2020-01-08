import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NavBar from './NavBar'
import Home from './Home'
import Poll from './Poll'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import LoadingBar from 'react-redux-loading'

/**
 * Application main component
 * Connected to Redux store
 * Gets initial data on mount
 * Most routes available only for authorized users (see PrivateRoute)
 */
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
        <Router>
          <LoadingBar />
          <NavBar></NavBar>
          { this.props.loading
            ? null
            : (
              <div>
                <Switch>
                  <Route path='/login' component={Login} />
                  <PrivateRoute path='/' exact>
                    <Home></Home>
                  </PrivateRoute>
                  <PrivateRoute path='/questions/:id'>
                    <Poll></Poll>
                  </PrivateRoute>
                  <PrivateRoute path='/add'>
                    <AddQuestion></AddQuestion>
                  </PrivateRoute>
                  <PrivateRoute path='/leaderboard'>
                    <LeaderBoard></LeaderBoard>
                  </PrivateRoute>
                  <Route path='*' component={NotFound} />
                </Switch>
              </div>
          )}
        </Router>
      </div>
    )
  }
}

function mapStateToProps ({ auth, users }) {
  return {
    auth,
    loading: !Object.keys(users).length
  }
}

export default connect(mapStateToProps)(App);
