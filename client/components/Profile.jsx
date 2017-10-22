import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Grid, Container} from 'semantic-ui-react'

import {PastRuns, EditProfile} from './index'
import {fetchPastRuns, fetchNeighborhoods} from '../store'

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
        <Grid.Column width={5} className='big-column'>
        {this.props.user.id &&
          <EditProfile />
        }
        </Grid.Column>
        <Grid.Column width={11} className='run-column'>
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

      if (profile) {
        dispatch(fetchPastRuns(profile.id))
        dispatch(fetchNeighborhoods(profile.city))

      }
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)
