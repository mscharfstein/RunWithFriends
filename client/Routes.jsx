import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Router} from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, UserHome, CreateProfile, Buddies, Profile } from './components'
import { me, fetchCities } from './store'

/**
 * COMPONENT
 */
export class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, hasProfile } = this.props

    return (
      <Router history={history}>
        <div className="container-fluid">
          <Main />
          <Switch>
            {
              isLoggedIn && hasProfile &&
                <Switch>
                  {/* Routes placed here are only available after logging in and creating profile */}
                  <Route path='/home' component={UserHome} />
                  <Route path='/buddies' component={Buddies} />
                  <Route path='/profile' component={Profile} />
                  <Route path='/' component={UserHome} />
                </Switch>
              }
            {
              isLoggedIn && !hasProfile &&
                <Switch>
                  {/* Routes placed here are only available after logging in, before creating profile */}
                  <Route path='/home' component={CreateProfile} />
                  <Route path='/' component={CreateProfile} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>

          </div>
        </Router>
    )

  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    hasProfile: !!state.user.profile
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchCities())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
