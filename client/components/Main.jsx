import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { logout } from '../store'
import { Container, Menu, Grid } from 'semantic-ui-react'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {

  render() {
    return (
      <div>
        <Menu color='blue' size='large' inverted secondary className='nav-bar'>
          <Menu.Item>
            <img src='' />
            <NavLink to='/home'>Run With Friends</NavLink>
          </Menu.Item>
          { this.props.isLoggedIn &&
          <Menu.Item>
            <a href='/profile'>Your Profile</a>
          </Menu.Item>
          }
          { this.props.isLoggedIn &&
          <Menu.Item>
            <a href='/' onClick={this.props.handleClick}>Logout<small>{this.props.user}</small></a>
          </Menu.Item>
          }
        </Menu>
      </div>

    )
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    currentUser: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  handleClick: () => {
    dispatch(logout());
    ownProps.history.push('/')
  }
});


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
}
