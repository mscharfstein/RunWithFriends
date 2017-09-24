import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid, Container, Menu} from 'semantic-ui-react'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {Main, RequestBuddyForm, BrowseRuns, ScrollingModal, IncomingRuns, PastRuns, RateRun, ProfileInfo} from './index'
import {fetchRequests, fetchPastRuns, fetchUpcomingRuns, fetchAllRuns} from '../store'
/**
 * COMPONENT
 */

export class Profile extends Component {

  componentDidMount() {
    console.log('mounting', this.props.user.profileId)
    this.props.loadInitialData(this.props.user.profileId)
  }

  render() {
    return (
      <Container fluid>
      <Grid columns={2} divided padded='horizontally' relaxed className='main-grid'>
        <Grid.Column width={6} className='patient-column'>

        </Grid.Column>
        <Grid.Column width={10} className='nurse-column'>
          <PastRuns />
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
    incomingRequests: state.incomingRequests,
    upcomingRun: state.upcomingRun,
    pastRuns: state.pastRuns,
    allRuns: state.allRuns
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(profileId) {
      console.log('fetcthing with profid', profileId)
      dispatch(fetchPastRuns(profileId))
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)
