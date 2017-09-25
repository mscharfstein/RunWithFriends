import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid, Container, Menu} from 'semantic-ui-react'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {Main, RequestBuddyForm, BrowseRuns, ScrollingModal, IncomingRuns, PastRuns, RateRun, CreateProfile} from './index'
import {fetchRequests, fetchPastRuns, fetchUpcomingRuns, fetchAllRuns} from '../store'
import history from '../history'

/**
 * COMPONENT
 */

export class UserHome extends Component {

  componentDidMount() {
    this.props.loadInitialData(this.props.user.profileId)
  }

  render() {

    return (
      <Container fluid>
      {this.props.incomingRequests.length &&
          <ScrollingModal header="You Have An Incoming Run Request!" content={<IncomingRuns run={this.props.incomingRequests[0]}/>} />
      }
      {new Date(Date.now()) > new Date(this.props.upcomingRun.date) &&
        <ScrollingModal header={'How was your run?'} content={<RateRun run={this.props.upcomingRun} profileId={this.props.user.profileId}/>} />
      }
      {this.props.user.id && !this.props.user.profile &&
        <CreateProfile />
      }
      <Grid columns={2} divided padded='horizontally' relaxed className='main-grid'>
        <Grid.Column width={10} className='patient-column'>
        {!!this.props.allRuns.length &&
          <BrowseRuns />
        }
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
    incomingRequests: state.incomingRequests,
    upcomingRun: state.upcomingRun,
    pastRuns: state.pastRuns,
    allRuns: state.allRuns
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(profileId) {
      dispatch(fetchAllRuns(profileId))
      if (profileId) {
        dispatch(fetchRequests(profileId))
        dispatch(fetchPastRuns(profileId))
        dispatch(fetchUpcomingRuns(profileId))
      }
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
