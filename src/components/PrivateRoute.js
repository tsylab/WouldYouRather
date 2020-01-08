import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

/**
 * Redirects unauthorized users to login page
 * Based on react-router documentation from https://reacttraining.com/react-router/web/example/auth-workflow
 * Connected to Redux store
 */

class PrivateRoute extends Component {
  render() {
    const { auth, dispatch, children, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }
}

function mapStateToProps ({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(PrivateRoute);