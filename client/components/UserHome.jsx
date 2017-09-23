import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid, Container, Menu} from 'semantic-ui-react'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {Main, RequestBuddyForm, BrowseRuns, ScrollingModal, IncomingRuns} from './index'
import {fetchRequests} from '../store'
/**
 * COMPONENT
 */

export class UserHome extends Component {

  componentDidMount() {
    this.props.getRequests(this.props.user.profileId)
  }

  render() {
    console.log('incomingreq', this.props.incomingRequests, this.props.incomingRequests.length)
    return (
      <Container fluid>
      {this.props.incomingRequests.length &&
          <ScrollingModal header="You Have An Incoming Run Request!" content={<IncomingRuns run={this.props.incomingRequests[0]}/>} />
      }
      <Grid columns={2} divided padded='horizontally' relaxed className='main-grid'>
        <Grid.Column width={10} className='patient-column'>

        </Grid.Column>
        <Grid.Column width={6} className='nurse-column'>
          <RequestBuddyForm />
        </Grid.Column>
      </Grid>
    </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user,
    incomingRequests: state.incomingRequests
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRequests(profileId) {
      dispatch(fetchRequests(profileId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
