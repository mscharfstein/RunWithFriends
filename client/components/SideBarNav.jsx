import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

class SidebarNav extends Component {

  render() {
    return (
      <div>
          <Sidebar as={Menu} width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='runs'>
              <Icon  />
              Your Profile
            </Menu.Item>
            <Menu.Item >
              <Icon  />
              Past Runs
            </Menu.Item>
            <Menu.Item name='logout'>
              <a href='#' onClick={this.props.handleClick}>Logout</a>
            </Menu.Item>
          </Sidebar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(SidebarNav))

