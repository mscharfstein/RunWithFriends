import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid, Container, Menu} from 'semantic-ui-react'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {Main, RequestBuddyForm, BrowseRuns, ScrollingModal, IncomingRuns, PastRuns, RateRun, ProfileInfo, EditProfile} from './index'
import {fetchRequests, fetchPastRuns, fetchUpcomingRuns, fetchAllRuns, fetchNeighborhoods, me} from '../store'
/**
 * COMPONENT
 */

export class Profile extends Component {

  componentWillUpdate(nextProps) {
    if (this.props.user !== nextProps.user) this.props.loadInitialData(nextProps.user.profile)
  }

  render() {
    return (
      <Container fluid style={{padding:"1em 2em"}}>
      <Grid columns={2} divided padded='horizontally' relaxed className='main-grid'>
        <Grid.Column width={5} className='nurse-column'>
        {this.props.user.id &&
          <EditProfile />
        }
        </Grid.Column>
        <Grid.Column width={11} className='patient-column'>
        {!!this.props.pastRuns.length &&
          <PastRuns />
        }
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
    pastRuns: state.pastRuns,
    neighborhoods: state.neighborhoods
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(profile) {
      //dispatch(me())
      console.log('profile', profile)

      if (profile) {
        dispatch(fetchPastRuns(profile.id))
        dispatch(fetchNeighborhoods(profile.city))

      }
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)
