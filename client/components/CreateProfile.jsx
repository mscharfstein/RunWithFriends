import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CreateProfileModal from './CreateProfileModal.jsx'

/**
 * COMPONENT
 */
export class CreateProfile extends Component {

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}! To get started, create a profile with us and let us know your running preferences:</h3>
        <CreateProfileModal />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(CreateProfile)


